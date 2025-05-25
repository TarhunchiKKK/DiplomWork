import { forwardRef, Module } from "@nestjs/common";
import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ElectronicDocument } from "./entities/document.entity";
import { DocumentAccessTokensModule } from "common/modules";
import { FavouriteDocumentsModule } from "./favourite/favourite-documents.module";
import { DocumentVersionsModule } from "../versions/document-versions.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ElectronicDocument]),
        DocumentAccessTokensModule,
        forwardRef(() => DocumentVersionsModule),
        FavouriteDocumentsModule
    ],
    controllers: [DocumentsController],
    providers: [DocumentsService],
    exports: [DocumentsService]
})
export class DocumentsModule {}
