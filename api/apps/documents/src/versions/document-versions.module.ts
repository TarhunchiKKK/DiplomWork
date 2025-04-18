import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentVersion } from "./entities/document-version.entity";
import { DocumentVersionsController } from "./document-versions.controller";
import { DocumentVersionsService } from "./document-versions.service";

@Module({
    imports: [TypeOrmModule.forFeature([DocumentVersion])],
    controllers: [DocumentVersionsController],
    providers: [DocumentVersionsService],
    exports: [DocumentVersionsService]
})
export class DocumentVersionsModule {}
