import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentVersion } from "./entities/document-version.entity";
import { Repository } from "typeorm";
import {
    ICreateDocumentVersionDto,
    IFindAllDocumentVersionsDto,
    IFindDocumentVersionByIdDto,
    IFindLastDocumentVersionDto
} from "common/grpc";
import { generateS3Filename } from "./helpers/s3.helpers";
import { version } from "os";

@Injectable()
export class DocumentVersionsService {
    public constructor(
        @InjectRepository(DocumentVersion) private readonly versionsRepository: Repository<DocumentVersion>
    ) {}

    public async create(dto: ICreateDocumentVersionDto) {
        const version = await this.versionsRepository.save({
            url: generateS3Filename(dto.fileExtension),
            description: dto.description
        });

        return {
            ...version,
            createdAt: version.createdAt.toISOString()
        };
    }

    public async findAll(dto: IFindAllDocumentVersionsDto) {
        const versions = await this.versionsRepository.find({
            where: {
                document: {
                    id: dto.documentId
                }
            },
            relations: {
                document: true
            }
        });

        return {
            versions: versions.map(version => ({
                id: version.id,
                url: version.url,
                description: version.description,
                createdAt: version.createdAt.toISOString()
            }))
        };
    }

    public async findOneById(dto: IFindDocumentVersionByIdDto) {
        const version = await this.versionsRepository.findOne({
            where: {
                id: dto.versionId
            }
        });

        if (!version) {
            throw new NotFoundException("ерсия не найдена");
        }

        return {
            ...version,
            createdAt: version.createdAt.toISOString()
        };
    }

    public async findLast(dto: IFindLastDocumentVersionDto) {
        const versions = await this.versionsRepository.find({
            where: {
                document: {
                    id: dto.documentId
                }
            },
            relations: {
                document: true
            },
            order: {
                createdAt: "DESC"
            }
        });

        if (versions.length === 0) {
            throw new NotFoundException("нет версий для документа");
        }

        return {
            ...version[0],
            createdAt: version[0].createdAt.toISOString()
        };
    }
}
