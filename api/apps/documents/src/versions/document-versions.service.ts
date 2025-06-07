import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentVersion } from "./entities/document-version.entity";
import { Repository } from "typeorm";
import { ICreateDocumentVersionDto } from "common/grpc";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { VersionCreatedEvent } from "./events/version-created.evnet";
import { UpdateDocumentDto } from "./dto/update-version.dto";

@Injectable()
export class DocumentVersionsService {
    public constructor(
        @InjectRepository(DocumentVersion) private readonly versionsRepository: Repository<DocumentVersion>,

        private readonly eventEmitter: EventEmitter2
    ) {}

    public async create(dto: ICreateDocumentVersionDto) {
        const version = await this.versionsRepository.save({
            s3Name: dto.s3Name,
            description: dto.description,
            hash: dto.hash,
            document: {
                id: dto.documentId
            }
        });

        this.eventEmitter.emit(VersionCreatedEvent.pattern, version.document.id);

        return version;
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
            },
            order: {
                createdAt: "DESC"
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

    public async update(versionId: string, dto: UpdateDocumentDto) {
        const version = await this.findOneById(versionId);

        Object.assign(version, dto);

        await this.versionsRepository.save(version);
    }
}
