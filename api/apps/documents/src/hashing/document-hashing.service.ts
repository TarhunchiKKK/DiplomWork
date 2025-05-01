import { Injectable } from "@nestjs/common";
import { DocumentVersionsService } from "../versions/document-versions.service";

@Injectable()
export class DocumentHashingService {
    public constructor(private readonly versionsService: DocumentVersionsService) {}
}
