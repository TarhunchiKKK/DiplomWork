import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentVersion } from "./entities/document-version.entity";
import { DocumentVersionsController } from "./document-versions.controller";
import { DocumentVersionsService } from "./document-versions.service";
import { DocumentsModule } from "../documents/documents.module";
import { DocumentRolesModule } from "../document-roles/document-roles.module";

@Module({
    imports: [TypeOrmModule.forFeature([DocumentVersion]), DocumentsModule, DocumentRolesModule],
    controllers: [DocumentVersionsController],
    providers: [DocumentVersionsService],
    exports: [DocumentVersionsService]
})
export class DocumentVersionsModule {}
