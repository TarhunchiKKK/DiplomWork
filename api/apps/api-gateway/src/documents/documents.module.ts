import { Module } from "@nestjs/common";
import { DocumentsGrpcModule } from "common/grpc";
import { DocumentsController } from "./documents.controller";
import { JwtTokensModule } from "common/modules";
import { FavouriteDocumentsModule } from "./favourite/favourite-documents.module";

@Module({
    imports: [DocumentsGrpcModule, JwtTokensModule, FavouriteDocumentsModule],
    controllers: [DocumentsController]
})
export class DocumentsModule {}
