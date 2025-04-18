import { Controller } from "@nestjs/common";
import { DocumentVersionsService } from "./document-versions.service";

@Controller()
export class DocumentVersionsController {
    public constructor(private readonly versionsService: DocumentVersionsService) {}
}
