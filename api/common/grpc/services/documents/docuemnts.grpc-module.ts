import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { DOCUMENTS_PACKAGE_NAME } from "common/grpc";
import { DocumentsGrpcService } from "./services/documents.grpc-service";
import { DocumentVersionsGrpcService } from "./services/document-versions.grpc-service";

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
    providers: [DocumentsGrpcService, DocumentVersionsGrpcService],
    exports: [DocumentsGrpcService, DocumentVersionsGrpcService]
})
export class DocumentsGrpcModule {}
