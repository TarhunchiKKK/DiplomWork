import { Module } from "@nestjs/common";
import { OrganizationsGrpcModule } from "common/grpc";
import { OrganizationsController } from "./organizations.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getJwtConfig } from "common/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig
        }),
        OrganizationsGrpcModule
    ],
    controllers: [OrganizationsController]
})
export class OrganizationsModule {}
