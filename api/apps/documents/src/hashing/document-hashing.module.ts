import { Module } from "@nestjs/common";
import { DocumentHashingController } from "./document-hashing.controller";
import { DocumentHashingService } from "./document-hashing.service";
import { DocumentVersionsModule } from "../versions/document-versions.module";
import { CryptoModule } from "common/modules";

@Module({
    imports: [DocumentVersionsModule, CryptoModule],
    controllers: [DocumentHashingController],
    providers: [DocumentHashingService]
})
export class DocumentHashingModule {}
