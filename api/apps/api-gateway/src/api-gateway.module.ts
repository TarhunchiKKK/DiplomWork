import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UsersManagementModule } from "./users-management/users-management.module";
import { OrganizationsManagementModule } from "./organizations-management/organizations-management.module";
import { ApigatewayController } from "./api-gateway.controller";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthenticationModule,
        OrganizationsManagementModule,
        UsersManagementModule
    ],
    controllers: [ApigatewayController]
})
export class ApiGatewayModule {}
