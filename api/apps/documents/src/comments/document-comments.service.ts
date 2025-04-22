import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentComment } from "./entities/document-comment.entity";
import { Repository } from "typeorm";
import { ICreateDocumentCommentDto } from "common/grpc";

@Injectable()
export class DocumentCommentsService {
    public constructor(
        @InjectRepository(DocumentComment) private readonly commentsRepository: Repository<DocumentComment>
    ) {}

    public async create(dto: ICreateDocumentCommentDto) {
        const comment = await this.commentsRepository.save({
            message: dto.message,
            creatorId: dto.creatorId,
            version: {
                id: dto.versionId
            }
        });

        return {
            ...comment,
            createdAt: comment.createdAt.toISOString()
        };
    }
}
