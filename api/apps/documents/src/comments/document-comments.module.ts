import { Module } from "@nestjs/common";
import { DocumentCommentsController } from "./document-comments.controller";
import { DocumentCommentsService } from "./document-comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentComment } from "./entities/document-comment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([DocumentComment])],
    controllers: [DocumentCommentsController],
    providers: [DocumentCommentsService]
})
export class DocumentCommentsModule {}
