import { Module } from "@nestjs/common";
import { DocumentsGrpcModule } from "common/grpc";
import { DocumentsController } from "./documents.controller";
import { DocumentAccessTokensModule, JwtTokensModule } from "common/modules";
import { FavouriteDocumentsModule } from "./favourite/favourite-documents.module";
import { DocumentVersionsModule } from "./versions/document-versions.module";
import { DocumentCommentsModule } from "./comments/document-comments.module";
import { DocumentHashingModule } from "./hashing/document-hashing.module";

@Module({
    imports: [
        DocumentsGrpcModule,
        JwtTokensModule,
        DocumentAccessTokensModule,
        FavouriteDocumentsModule,
        DocumentVersionsModule,
        DocumentCommentsModule,
        DocumentHashingModule
    ],
    controllers: [DocumentsController]
})
export class DocumentsModule {}
