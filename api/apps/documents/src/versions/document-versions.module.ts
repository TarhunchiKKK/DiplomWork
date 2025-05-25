import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentVersion } from "./entities/document-version.entity";
import { DocumentVersionsController } from "./document-versions.controller";
import { DocumentVersionsService } from "./document-versions.service";
import { DocumentAccessTokensModule } from "common/modules";
import { DocumentsModule } from "../documents/documents.module";
import { WorkflowsGrpcModule } from "common/grpc";

@Module({
    imports: [
        TypeOrmModule.forFeature([DocumentVersion]),
        forwardRef(() => DocumentsModule),
        DocumentAccessTokensModule,
        WorkflowsGrpcModule
    ],
    controllers: [DocumentVersionsController],
    providers: [DocumentVersionsService],
    exports: [DocumentVersionsService]
})
export class DocumentVersionsModule {}
