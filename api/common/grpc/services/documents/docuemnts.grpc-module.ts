import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { DOCUMENTS_PACKAGE_NAME } from "common/grpc";
import { DocumentsGrpcService } from "./services/documents.grpc-service";
import { DocumentVersionsGrpcService } from "./services/document-versions.grpc-service";
import { FavouriteDocumentsGrpcService } from "./services/favourite-document.grpc-service";
import { DocumentCommentsGrpcService } from "./services/document-comments.grpc-service";
import { DocumentHashingGrpcService } from "./services/document-hashing.grpc-service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: DOCUMENTS_PACKAGE_NAME,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => getGrpcConfig(configService, DOCUMENTS_PACKAGE_NAME)
            }
        ])
    ],
    providers: [
        DocumentsGrpcService,
        DocumentVersionsGrpcService,
        FavouriteDocumentsGrpcService,
        DocumentCommentsGrpcService,
        DocumentHashingGrpcService
    ],
    exports: [
        DocumentsGrpcService,
        DocumentVersionsGrpcService,
        FavouriteDocumentsGrpcService,
        DocumentCommentsGrpcService,
        DocumentHashingGrpcService
    ]
})
export class DocumentsGrpcModule {}
