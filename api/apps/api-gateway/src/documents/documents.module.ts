import { Module } from "@nestjs/common";
import { DocumentsGrpcModule } from "common/grpc";
import { DocumentsController } from "./documents.controller";

@Module({
    imports: [DocumentsGrpcModule],
    controllers: [DocumentsController]
})
export class DocumentsModule {}
