import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./services/authentication.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConfigModuleConfig, getGrpcConfig, getJwtConfig } from "common/config";
import { ClientsModule } from "@nestjs/microservices";
import { USERS_MANAGEMENT_PACKAGE_NAME } from "common/grpc";
import { JwtModule } from "@nestjs/jwt";
import { UsersManagementGrpcService } from "./services/users-management.grpc-service";

@Module({
    imports: [
        ConfigModule.forRoot(getConfigModuleConfig()),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig
        }),
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
    controllers: [AuthenticationController],
    providers: [AuthenticationService, UsersManagementGrpcService]
})
export class AuthenticationModule {}
