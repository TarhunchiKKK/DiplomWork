import { Module } from "@nestjs/common";
import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ElectronicDocument } from "./entities/document.entity";
import { DocumentAccessTokensModule } from "common/modules";

@Module({
    imports: [TypeOrmModule.forFeature([ElectronicDocument]), DocumentAccessTokensModule],
    controllers: [DocumentsController],
    providers: [DocumentsService]
})
export class DocumentsModule {}
