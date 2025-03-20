import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationGrpcModule } from "./authentication/authentication.grpc-module";
import { UsersManagementGrpcModule } from "./users-management/users-management.grpc-module";
import { OrganizationsManagementGrpcModule } from "./organizations-management/organizations-management.grpc-module";
import { ApigatewayController } from "./api-gateway.controller";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthenticationGrpcModule,
        OrganizationsManagementGrpcModule,
        UsersManagementGrpcModule
    ],
    controllers: [ApigatewayController]
})
export class ApiGatewayModule {}
