import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationGrpcModule } from "./authentication/authentication.grpc-module";
import { UsersManagementGrpcModule } from "./users-management/users-management.grpc-module";
import { OrganizationsManagementGrpcModule } from "./organizations-management/organizations-management.grpc-module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthenticationGrpcModule,
        OrganizationsManagementGrpcModule,
        UsersManagementGrpcModule
    ],
    controllers: []
})
export class ApiGatewayModule {}
