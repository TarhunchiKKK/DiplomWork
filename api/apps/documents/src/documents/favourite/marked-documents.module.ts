import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavouriteDocumentInfo } from "./entities/favourite-document-info.entity";
import { FavouriteDocumentsController } from "./favourite-documents.controller";
import { FavouriteDocumentsService } from "./favourite-documents.service";

@Module({
    imports: [TypeOrmModule.forFeature([FavouriteDocumentInfo])],
    controllers: [FavouriteDocumentsController],
    providers: [FavouriteDocumentsService]
})
export class FavouriteDocumentsModule {}
