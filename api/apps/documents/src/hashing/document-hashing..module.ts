import { Module } from "@nestjs/common";
import { DocumentHashingController } from "./document-hashing.controller";
import { DocumentHashingService } from "./document-hashing.service";
import { DocumentVersionsModule } from "apps/api-gateway/src/documents/versions/document-versions.module";

@Module({
    imports: [DocumentVersionsModule],
    controllers: [DocumentHashingController],
    providers: [DocumentHashingService]
})
export class DocumentHashingModule {}
