import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ElectronicDocument } from "./entities/document.entity";
import { Repository } from "typeorm";
import { ICreateDocumentDto, IUpdateDocumentInfoDto } from "common/grpc";
import { DocumentAccessTokensService } from "common/modules";
import { DocumentStatus } from "./enums/document-status.enum";
import * as uuid from "uuid";
import { IgnoreFields } from "common/utils";

@Injectable()
export class DocumentsService {
    public constructor(
        @InjectRepository(ElectronicDocument) private readonly documentsRepository: Repository<ElectronicDocument>,

        private readonly tokensService: DocumentAccessTokensService
    ) {}

    private generateS3Filename(fileExtension: string) {
        const filename = uuid.v4();
        return `${filename}.${fileExtension}`;
    }

    private verifyAccess(token: string, userId: string) {
        const tokenInfo = this.tokensService.verify(token);

        return tokenInfo.authorId === userId || tokenInfo.usersIds.includes(userId);
    }

    public create(dto: ICreateDocumentDto) {
        return this.documentsRepository.save({
            aimId: dto.aimId,
            typeId: dto.typeId,
            authorId: dto.authorId,
            isUrgent: dto.isUrgent,
            title: dto.title,
            status: DocumentStatus.DEFAULT,
            url: this.generateS3Filename(dto.fileExtension),
            accessToken: this.tokensService.create({
                authorId: dto.authorId,
                usersIds: []
            })
        });
    }

    public async updateInfo(dto: IUpdateDocumentInfoDto) {
        const { documentId, userId, ...data } = dto;

        const document = await this.documentsRepository.findOne({
            where: { id: documentId }
        });

        if (!document) {
            throw new NotFoundException("Документ не найден");
        }

        const haveAccess = this.verifyAccess(document.accessToken, userId);

        if (!haveAccess) {
            throw new UnauthorizedException("Доступ запрещен");
        }

        Object.assign(document, data);

        await this.documentsRepository.save(document);
    }
}
