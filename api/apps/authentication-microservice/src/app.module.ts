import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { JwtModule } from "@nestjs/jwt";
import { getJwtConfig } from "common/config";
import { OrganizationsManagementGrpcModule, UsersManagementGrpcModule } from "common/grpc";
import { TokensModule } from "common/modules";

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
        TokensModule,
        AuthenticationModule,
        OrganizationsManagementGrpcModule,
        UsersManagementGrpcModule
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AppModule {}
