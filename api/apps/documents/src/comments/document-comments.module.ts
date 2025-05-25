import { Module } from "@nestjs/common";
import { DocumentCommentsController } from "./document-comments.controller";
import { DocumentCommentsService } from "./document-comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentComment } from "./entities/document-comment.entity";
import { DocumentCommentsEventsObserver } from "./document-comments-events.observer";
import { NotificationsRmqModule } from "common/rabbitmq";
import { UsersGrpcModule } from "common/grpc";
import { DocumentVersionsModule } from "../versions/document-versions.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([DocumentComment]),
        NotificationsRmqModule,
        DocumentVersionsModule,
        UsersGrpcModule
    ],
    controllers: [DocumentCommentsController],
    providers: [DocumentCommentsService, DocumentCommentsEventsObserver],
    exports: [DocumentCommentsService]
})
export class DocumentCommentsModule {}
