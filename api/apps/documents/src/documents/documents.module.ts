import { Module } from "@nestjs/common";
import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ElectronicDocument } from "./entities/document.entity";
import { DocumentAccessTokensModule } from "common/modules";
import { DocumentRolesModule } from "../document-roles/document-roles.module";

@Module({
    imports: [TypeOrmModule.forFeature([ElectronicDocument]), DocumentAccessTokensModule, DocumentRolesModule],
    controllers: [DocumentsController],
    providers: [DocumentsService]
})
export class DocumentsModule {}
