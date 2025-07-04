import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentComment } from "./entities/document-comment.entity";
import { Repository } from "typeorm";
import { ICreateDocumentCommentDto, IUpdateDocumentCommentDto } from "common/grpc";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CommentCreatedEvent } from "./events/comment-created.event";
import { CommentUpdatedEvent } from "./events/comment-updated.event";
import { CommentStatus } from "./enums/comment-status.enum";
import { CommentDeletedEvent } from "./events/comment-deleted.event";
import { Cron } from "@nestjs/schedule";
import { IgnoreFields } from "common/utils";

@Injectable()
export class DocumentCommentsService {
    public constructor(
        @InjectRepository(DocumentComment) private readonly commentsRepository: Repository<DocumentComment>,

        private readonly eventEmitter: EventEmitter2
    ) {}

    public async create(dto: ICreateDocumentCommentDto) {
        const comment = await this.commentsRepository.save({
            message: dto.message,
            creatorId: dto.creatorId,
            version: {
                id: dto.versionId
            }
        });

        this.eventEmitter.emit(CommentCreatedEvent.PATTERN, new CommentCreatedEvent(comment.id));

        return comment;
    }

    public async findAll(versionId: string) {
        return await this.commentsRepository.find({
            where: {
                version: {
                    id: versionId
                },
                status: CommentStatus.ACTIVE
            },
            relations: {
                version: true
            }
        });
    }

    public async findOne(commentId: string) {
        const comment = await this.commentsRepository.findOne({
            where: {
                id: commentId
            },
            relations: {
                version: true
            }
        });

        if (!comment) {
            throw new NotFoundException("Комментарий не найден");
        }

        return comment;
    }

    public async update(commentId: string, dto: IgnoreFields<IUpdateDocumentCommentDto, "id">) {
        const comment = await this.findOne(commentId);

        Object.assign(comment, dto);

        await this.commentsRepository.save(comment);

        this.eventEmitter.emit(CommentUpdatedEvent.PATTERN, new CommentUpdatedEvent(comment.id));
    }

    public async delete(commentId: string) {
        const comment = await this.findOne(commentId);

        comment.status = CommentStatus.DELETED;

        await this.commentsRepository.save(comment);

        this.eventEmitter.emit(CommentDeletedEvent.PATTERN, new CommentDeletedEvent(comment.id));
    }

    @Cron("0 0 * * *")
    private async removeDeleted() {
        const comments = await this.commentsRepository.find({
            where: {
                status: CommentStatus.DELETED
            }
        });

        await Promise.all(comments.map(comment => this.commentsRepository.remove(comment)));
    }
}
