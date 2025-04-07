import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { ORGANIZATIONS_PACKAGE_NAME } from "common/grpc";
import { OrganizationsGrpcService } from "./organizations.grpc-service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: ORGANIZATIONS_PACKAGE_NAME,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => getGrpcConfig(configService, ORGANIZATIONS_PACKAGE_NAME)
            }
        ])
    ],
    providers: [OrganizationsGrpcService],
    exports: [OrganizationsGrpcService]
})
export class OrganizationsGrpcModule {}
