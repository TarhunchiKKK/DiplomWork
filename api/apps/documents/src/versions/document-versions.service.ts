import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentVersion } from "./entities/document-version.entity";
import { Repository } from "typeorm";
import { ICreateDocumentVersionDto } from "common/grpc";
import { DocumentsService } from "../documents/documents.service";
import { DocumentRolesService } from "../roles/document-roles.service";
import { DocumentOperation } from "../roles/enums/document-operation.enum";
import { generateS3Filename } from "./helpers/s3.helpers";

@Injectable()
export class DocumentVersionsService {
    public constructor(
        @InjectRepository(DocumentVersion) private readonly versionsRepository: Repository<DocumentVersion>,

        @Inject(forwardRef(() => DocumentsService)) private readonly documentsService: DocumentsService,

        private readonly rolesService: DocumentRolesService
    ) {}

    public async create(dto: ICreateDocumentVersionDto) {
        const document = await this.documentsService.findOneById(dto.documentId);

        this.rolesService.checkPermissions({
            token: document.accessToken,
            userId: dto.userId,
            operation: DocumentOperation.UPDATE_FILE
        });

        const version = await this.versionsRepository.save({
            url: generateS3Filename(dto.fileExtension),
            description: dto.description
        });

        return {
            ...version,
            createdAt: version.createdAt.toISOString()
        };
    }
}
