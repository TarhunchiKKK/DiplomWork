import { Module } from "@nestjs/common";
import { DocumentsGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { FavouriteDocumentsController } from "./favourite-documents.controller";

@Module({
    imports: [DocumentsGrpcModule, JwtTokensModule],
    controllers: [FavouriteDocumentsController]
})
export class FavouriteDocumentsModule {}
