import { Controller, Get } from "@nestjs/common";
import { DocumentsManagementService } from "./documents-management.service";

@Controller()
export class DocumentsManagementController {
    constructor(private readonly documentsManagementService: DocumentsManagementService) {}

    @Get()
    getHello(): string {
        return this.documentsManagementService.getHello();
    }
}
