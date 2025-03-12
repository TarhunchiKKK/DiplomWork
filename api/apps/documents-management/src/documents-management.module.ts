import { Module } from "@nestjs/common";
import { DocumentsManagementController } from "./documents-management.controller";
import { DocumentsManagementService } from "./documents-management.service";

@Module({
    imports: [],
    controllers: [DocumentsManagementController],
    providers: [DocumentsManagementService]
})
export class DocumentsManagementModule {}
