import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentsModule } from "./documents/documents.module";
import { ElectronicDocument } from "./documents/entities/document.entity";
import { DocumentAccessTokensModule } from "common/modules";
import { FavouriteDocumentInfo } from "./documents/favourite/entities/favourite-document-info.entity";
import { DocumentVersionsModule } from "./versions/document-versions.module";
import { DocumentVersion } from "./versions/entities/document-version.entity";
import { DocumentComment } from "./comments/entities/document-comment.entity";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                database: configService.getOrThrow<string>("DOCUMENTS_MICROSERVICE_DB_NAME"),
                host: configService.getOrThrow<string>("DOCUMENTS_MICROSERVICE_DB_HOST"),
                port: +configService.getOrThrow<number>("DOCUMENTS_MICROSERVICE_DB_PORT"),
                username: configService.getOrThrow<string>("DOCUMENTS_MICROSERVICE_DB_USER"),
                password: configService.getOrThrow<string>("DOCUMENTS_MICROSERVICE_DB_PASSWORD"),
                synchronize: true,
                entities: [ElectronicDocument, FavouriteDocumentInfo, DocumentVersion, DocumentComment]
            })
        }),
        EventEmitterModule.forRoot(),
        ScheduleModule.forRoot(),
        DocumentsModule,
        DocumentVersionsModule,
        DocumentAccessTokensModule
    ]
})
export class AppModule {}
