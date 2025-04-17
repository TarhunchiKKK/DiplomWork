import { Module } from "@nestjs/common";
import { DocumentsGrpcModule } from "common/grpc";
import { DocumentsController } from "./documents.controller";
import { JwtTokensModule } from "common/modules";

@Module({
    imports: [DocumentsGrpcModule, JwtTokensModule],
    controllers: [DocumentsController]
})
export class DocumentsModule {}
