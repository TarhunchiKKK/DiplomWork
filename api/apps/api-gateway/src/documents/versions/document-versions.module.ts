import { Module } from "@nestjs/common";
import { DocumentsGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { DocumentVersionsController } from "./document-versions.controller";

@Module({
    imports: [DocumentsGrpcModule, JwtTokensModule],
    controllers: [DocumentVersionsController]
})
export class DocumentVersionsModule {}
