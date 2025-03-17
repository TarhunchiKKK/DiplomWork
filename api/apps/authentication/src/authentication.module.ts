import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConfigModuleConfig, getJwtConfig } from "common/config";
import { JwtModule } from "@nestjs/jwt";
import { UsersManagementGrpcModule } from "./users-management/users-management.grpc-module";

@Module({
    imports: [
        ConfigModule.forRoot(getConfigModuleConfig()),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig
        }),
        UsersManagementGrpcModule
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AuthenticationModule {}
