import { Module } from "@nestjs/common";
import { UsersManagementGrpcService } from "./users-management.grpc-service";
import { ClientsModule } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getGrpcConfig } from "common/config";
import { USERS_MANAGEMENT_PACKAGE_NAME } from "common/grpc";
import { UsersManagementGrpcController } from "./users-management.grpc-controller";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: USERS_MANAGEMENT_PACKAGE_NAME,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) =>
                    getGrpcConfig(configService, USERS_MANAGEMENT_PACKAGE_NAME)
            }
        ])
    ],
    controllers: [UsersManagementGrpcController],
    providers: [UsersManagementGrpcService],
    exports: [UsersManagementGrpcService]
})
export class UsersManagementModule {}
