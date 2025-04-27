import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentVersion } from "./entities/document-version.entity";
import { Repository } from "typeorm";
import { ICreateDocumentVersionDto } from "common/grpc";
import { generateS3Filename } from "./helpers/s3.helpers";

@Injectable()
export class DocumentVersionsService {
    public constructor(
        @InjectRepository(DocumentVersion) private readonly versionsRepository: Repository<DocumentVersion>
    ) {}

    public async create(dto: ICreateDocumentVersionDto) {
        return await this.versionsRepository.save({
            url: generateS3Filename(dto.fileExtension),
            description: dto.description
        });
    }

    public async findAll(documentId: string) {
        return await this.versionsRepository.find({
            where: {
                document: {
                    id: documentId
                }
            },
            relations: {
                document: true
            }
        });
    }

    public async findOneById(versionId: string) {
        const version = await this.versionsRepository.findOne({
            where: {
                id: versionId
            }
        });

        if (!version) {
            throw new NotFoundException("Версия не найдена");
        }

        return version;
    }

    public async findLast(documentId: string) {
        const versions = await this.versionsRepository.find({
            where: {
                document: {
                    id: documentId
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
            throw new NotFoundException("Нет версий для документа");
        }

        return versions[0];
    }

    public async findVersionDocument(versionId: string) {
        const version = await this.versionsRepository.findOne({
            where: {
                id: versionId
            },
            relations: {
                document: true
            }
        });

        if (!version) {
            throw new NotFoundException("Версия не найдена");
        }

        return version.document;
    }
}
