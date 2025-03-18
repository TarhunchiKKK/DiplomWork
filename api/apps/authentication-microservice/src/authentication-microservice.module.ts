import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UsersManagementGrpcModule } from "./grpc/users-management/users-management.grpc-module";
import { OrganizationsManagementGrpcModule } from "./grpc/organizations-management/organizations-management.grpc-module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthenticationModule,
        OrganizationsManagementGrpcModule,
        UsersManagementGrpcModule
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})
export class AuthenticationMicroserviceModule {}
