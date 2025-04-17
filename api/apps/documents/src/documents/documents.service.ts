import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ElectronicDocument } from "./entities/document.entity";
import { Repository } from "typeorm";
import { ICreateDocumentDto } from "common/grpc";
import { DocumentAccessTokensService } from "common/modules";

@Injectable()
export class DocumentsService {
    public constructor(
        @InjectRepository(ElectronicDocument) private readonly documentsRepository: Repository<ElectronicDocument>,

        private readonly tokensService: DocumentAccessTokensService
    ) {}

    public create(dto: ICreateDocumentDto) {
        return this.documentsRepository.save({
            ...dto,
            accessToken: this.tokensService.create({
                authorId: dto.authorId,
                usersIds: []
            })
        });
    }
}
