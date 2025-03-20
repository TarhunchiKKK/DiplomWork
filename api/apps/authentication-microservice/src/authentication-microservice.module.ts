import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UsersManagementGrpcModule } from "./grpc/users-management/users-management.grpc-module";
import { OrganizationsManagementGrpcModule } from "./grpc/organizations-management/organizations-management.grpc-module";
import { JwtModule } from "@nestjs/jwt";
import { getJwtConfig } from "common/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig
        }),
        AuthenticationModule,
        OrganizationsManagementGrpcModule,
        UsersManagementGrpcModule
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AuthenticationMicroserviceModule {}
