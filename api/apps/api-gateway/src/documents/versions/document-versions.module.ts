import { Module } from "@nestjs/common";
import { DocumentsGrpcModule, WorkflowsGrpcModule } from "common/grpc";
import { DocumentAccessTokensModule, JwtTokensModule } from "common/modules";
import { DocumentVersionsController } from "./document-versions.controller";

@Module({
    imports: [DocumentsGrpcModule, WorkflowsGrpcModule, JwtTokensModule, DocumentAccessTokensModule],
    controllers: [DocumentVersionsController]
})
export class DocumentVersionsModule {}
