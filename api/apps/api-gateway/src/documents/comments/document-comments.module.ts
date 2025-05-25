import { Module } from "@nestjs/common";
import { DocumentsGrpcModule } from "common/grpc";
import { DocumentAccessTokensModule, JwtTokensModule } from "common/modules";
import { DocumentCommentsController } from "./document-comments.controller";

@Module({
    imports: [DocumentsGrpcModule, JwtTokensModule, DocumentAccessTokensModule],
    controllers: [DocumentCommentsController]
})
export class DocumentCommentsModule {}
