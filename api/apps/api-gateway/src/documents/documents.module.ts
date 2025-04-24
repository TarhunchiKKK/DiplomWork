import { Module } from "@nestjs/common";
import { DocumentsGrpcModule } from "common/grpc";
import { DocumentsController } from "./documents.controller";
import { DocumentAccessTokensModule, JwtTokensModule } from "common/modules";
import { FavouriteDocumentsModule } from "./favourite/favourite-documents.module";
import { DocumentVersionsModule } from "./versions/document-versions.module";
import { DocumentCommentsModule } from "./comments/document-comments.module";

@Module({
    imports: [
        DocumentsGrpcModule,
        JwtTokensModule,
        DocumentAccessTokensModule,
        FavouriteDocumentsModule,
        DocumentVersionsModule,
        DocumentCommentsModule
    ],
    controllers: [DocumentsController]
})
export class DocumentsModule {}
