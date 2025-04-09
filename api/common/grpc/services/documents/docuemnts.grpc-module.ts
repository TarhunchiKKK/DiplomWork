import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { DOCUMENTS_PACKAGE_NAME, DOCUMENTS_SERVICE_NAME } from "common/grpc/generated";
import { DocumentsGrpcService } from "./documents.grpc-service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: DOCUMENTS_SERVICE_NAME,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => getGrpcConfig(configService, DOCUMENTS_PACKAGE_NAME)
            }
        ])
    ],
    providers: [DocumentsGrpcService],
    exports: [DocumentsGrpcService]
})
export class DocumentsGrpcModule {}
