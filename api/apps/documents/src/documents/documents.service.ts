import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ElectronicDocument } from "./entities/document.entity";
import { Repository } from "typeorm";
import { ICreateDocumentDto, IFindDocumentsDto, IUpdateDocumentDto } from "common/grpc";
import { DocumentAccessTokensService } from "common/modules";
import { FindDocumentsQueryBuilder } from "./utils/find-documents.query-builder";
import { DocumentVersionsService } from "../versions/document-versions.service";
import { IgnoreFields } from "common/utils";

@Injectable()
export class DocumentsService {
    public constructor(
        @InjectRepository(ElectronicDocument) private readonly documentsRepository: Repository<ElectronicDocument>,

        private readonly tokensService: DocumentAccessTokensService,

        private readonly versionsService: DocumentVersionsService
    ) {}

    public async create(dto: ICreateDocumentDto) {
        const document = await this.documentsRepository.save({
            aimId: dto.aimId,
            typeId: dto.typeId,
            authorId: dto.authorId,
            isUrgent: dto.isUrgent,
            title: dto.title,
            accessToken: this.tokensService.create({
                authorId: dto.authorId,
                usersIds: []
            })
        });

        this.versionsService.create({
            documentId: document.id,
            fileExtension: dto.fileExtension,
            hash: dto.hash
        });

        return document;
    }

    public async findAll(dto: IFindDocumentsDto) {
        return await this.documentsRepository.find(new FindDocumentsQueryBuilder(dto).build());
    }

    public async findOneById(documentId: string) {
        const document = await this.documentsRepository.findOne({
            where: { id: documentId }
        });

        if (!document) {
            throw new NotFoundException("Документ не найден");
        }

        return document;
    }

    public async update(documentId: string, dto: IgnoreFields<IUpdateDocumentDto, "id">) {
        const document = await this.findOneById(documentId);

        Object.assign(document, dto);

        await this.documentsRepository.save(document);
    }
}
