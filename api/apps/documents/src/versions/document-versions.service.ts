import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentVersion } from "./entities/document-version.entity";
import { Repository } from "typeorm";

@Injectable()
export class DocumentVersionsService {
    public constructor(
        @InjectRepository(DocumentVersion) private readonly versionsRepository: Repository<DocumentVersion>
    ) {}
}
