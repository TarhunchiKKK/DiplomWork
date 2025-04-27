import { Module } from "@nestjs/common";
import { DocumentCommentsNotificationsModule } from "./comments/document-comments-notifications.module";

@Module({
    imports: [DocumentCommentsNotificationsModule]
})
export class DocumentNotificationsModule {}
