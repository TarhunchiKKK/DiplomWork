import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJwtConfig } from "common/config";
import { UsersManagementGrpcModule } from "../grpc/users-management/users-management.grpc-module";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";

@Module({
    imports: [
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
