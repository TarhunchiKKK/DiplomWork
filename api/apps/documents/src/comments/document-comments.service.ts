import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentComment } from "./entities/document-comment.entity";
import { Repository } from "typeorm";

@Injectable()
export class DocumentCommentsService {
    public constructor(
        @InjectRepository(DocumentComment) private readonly commentsRepository: Repository<DocumentComment>
    ) {}
}
