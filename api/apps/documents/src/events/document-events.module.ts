import { Module } from "@nestjs/common";
import { DocumentVersionsModule } from "../versions/document-versions.module";
import { DocumentCommentsModule } from "../comments/document-comments.module";
import { UsersGrpcModule } from "common/grpc";
import { DocumentEventsObserver } from "./document-events.observer";
import { DocumentsModule } from "../documents/documents.module";
import { NotificationsRmqModule } from "common/rabbitmq";

@Module({
    imports: [DocumentsModule, DocumentVersionsModule, DocumentCommentsModule, UsersGrpcModule, NotificationsRmqModule],
    providers: [DocumentEventsObserver]
})
export class DocumentEventsModule {}
