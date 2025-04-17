import { Controller } from "@nestjs/common";
import { DocumentsService } from "./documents.service";

@Controller()
export class DocumentsController {
    public constructor(private readonly documentsService: DocumentsService) {}
}
