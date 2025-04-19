import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ElectronicDocument } from "./entities/document.entity";
import { Repository } from "typeorm";
import { ICreateDocumentDto, IFindDocumentsDto, IUpdateDocumentDto } from "common/grpc";
import { DocumentAccessTokensService } from "common/modules";
import { DocumentRolesService } from "../roles/document-roles.service";
import { DocumentOperation } from "../roles/enums/document-operation.enum";
import { FindDocumentsQueryBuilder } from "./utils/find-documents.query-builder";
import { DocumentStatus } from "common/enums";
import { getShortDocumentData } from "./helpers/documents.helpers";
import { DocumentVersionsService } from "../versions/document-versions.service";
import lodash from "lodash";

@Injectable()
export class DocumentsService {
    public constructor(
        @InjectRepository(ElectronicDocument) private readonly documentsRepository: Repository<ElectronicDocument>,

        private readonly tokensService: DocumentAccessTokensService,

        private readonly rolesService: DocumentRolesService,

        @Inject(forwardRef(() => DocumentVersionsService)) private readonly versionsService: DocumentVersionsService
    ) {}

    public async create(dto: ICreateDocumentDto) {
        const document = await this.documentsRepository.save({
            aimId: dto.aimId,
            typeId: dto.typeId,
            authorId: dto.authorId,
            isUrgent: dto.isUrgent,
            title: dto.title,
            status: DocumentStatus.DEFAULT,
            accessToken: this.tokensService.create({
                authorId: dto.authorId,
                usersIds: []
            })
        });

        this.versionsService.create({
            documentId: document.id,
            fileExtension: dto.fileExtension,
            userId: dto.authorId
        });

        return lodash.pick(document, ["id", "authorId", "title", "typeId", "aimId", "status", "isUrgent"]);
    }

    public async findAll(dto: IFindDocumentsDto) {
        const documents = await this.documentsRepository.find(new FindDocumentsQueryBuilder(dto).build());

        return {
            documents: documents.map(getShortDocumentData)
        };
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

    public async update(dto: IUpdateDocumentDto) {
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
}
