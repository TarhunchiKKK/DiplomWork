import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { ORGANIZATIONS_MANAGEMENT_PACKAGE_NAME } from "common/grpc";
import { OrganizationsManagementGrpcService } from "./organizations-management.grpc-service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: ORGANIZATIONS_MANAGEMENT_PACKAGE_NAME,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) =>
                    getGrpcConfig(configService, ORGANIZATIONS_MANAGEMENT_PACKAGE_NAME)
            }
        ])
    ],
    providers: [OrganizationsManagementGrpcService],
    exports: [OrganizationsManagementGrpcService]
})
export class OrganizationsManagementGrpcModule {}
