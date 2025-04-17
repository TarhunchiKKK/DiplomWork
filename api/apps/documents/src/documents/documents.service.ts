import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ElectronicDocument } from "./entities/document.entity";
import { Repository } from "typeorm";
import { ICreateDocumentDto, IFindDocumentsDto, IUpdateDocumentFileDto, IUpdateDocumentInfoDto } from "common/grpc";
import { DocumentAccessTokensService } from "common/modules";
import * as uuid from "uuid";
import { DocumentRolesService } from "../document-roles/document-roles.service";
import { DocumentOperation } from "../document-roles/enums/document-operation.enum";
import { FindDocumentsQueryBuilder } from "./utils/find-documents.query-builder";
import { DocumentStatus } from "common/enums";

@Injectable()
export class DocumentsService {
    public constructor(
        @InjectRepository(ElectronicDocument) private readonly documentsRepository: Repository<ElectronicDocument>,

        private readonly tokensService: DocumentAccessTokensService,

        private readonly rolesService: DocumentRolesService
    ) {}

    private generateS3Filename(fileExtension: string) {
        const filename = uuid.v4();
        return `${filename}.${fileExtension}`;
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

    public async findAll(dto: IFindDocumentsDto) {
        return await this.documentsRepository.find(new FindDocumentsQueryBuilder(dto).build());
    }

    public async findOneById(id: string) {
        const document = await this.documentsRepository.findOne({
            where: { id: id }
        });

        if (!document) {
            throw new NotFoundException("Документ не найден");
        }

        return document;
    }

    public async updateInfo(dto: IUpdateDocumentInfoDto) {
        const { documentId, userId, ...data } = dto;

        const document = await this.findOneById(documentId);

        this.rolesService.checkPermissions({
            token: document.accessToken,
            userId: userId,
            operation: DocumentOperation.UPDATE_INFO
        });

        Object.assign(document, data);

        await this.documentsRepository.save(document);
    }

    public async updateFile(dto: IUpdateDocumentFileDto) {
        const document = await this.findOneById(dto.documentId);

        this.rolesService.checkPermissions({
            token: document.accessToken,
            userId: dto.userId,
            operation: DocumentOperation.UPDATE_FILE
        });

        document.url = this.generateS3Filename(dto.fileExtension);

        await this.documentsRepository.save(document);

        return {
            url: document.url
        };
    }
}
