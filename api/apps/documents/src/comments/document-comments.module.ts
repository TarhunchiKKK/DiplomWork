import { Module } from "@nestjs/common";
import { DocumentCommentsController } from "./document-comments.controller";
import { DocumentCommentsService } from "./document-comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentComment } from "./entities/document-comment.entity";
import { DocumentCommentsEventsObserver } from "./document-comments-events.observer";
import { NotificationsRmqService } from "common/rabbitmq";
import { DocumentVersionsService } from "../versions/document-versions.service";
import { UsersGrpcModule } from "common/grpc";

@Module({
    imports: [
        TypeOrmModule.forFeature([DocumentComment]),
        NotificationsRmqService,
        DocumentVersionsService,
        UsersGrpcModule
    ],
    controllers: [DocumentCommentsController],
    providers: [DocumentCommentsService, DocumentCommentsEventsObserver],
    exports: [DocumentCommentsService]
})
export class DocumentCommentsModule {}
