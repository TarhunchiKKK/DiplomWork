import { Module } from "@nestjs/common";
import { DocumentsGrpcModule } from "common/grpc";
import { DocumentAccessTokensModule, JwtTokensModule } from "common/modules";
import { DocumentVersionsController } from "./document-versions.controller";

@Module({
    imports: [DocumentsGrpcModule, JwtTokensModule, DocumentAccessTokensModule],
    controllers: [DocumentVersionsController]
})
export class DocumentVersionsModule {}
