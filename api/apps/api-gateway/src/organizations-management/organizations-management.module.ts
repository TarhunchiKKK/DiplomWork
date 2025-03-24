import { Module } from "@nestjs/common";
import { OrganizationsManagementGrpcModule } from "common/grpc";
import { OrganizationsManagementController } from "./organizations-management.controller";
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
        OrganizationsManagementGrpcModule
    ],
    controllers: [OrganizationsManagementController]
})
export class OrganizationsManagementModule {}
