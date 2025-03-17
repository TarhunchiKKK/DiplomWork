import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { getConfigModuleConfig } from "common/config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UsersManagementModule } from "./users-management/users-management.module";

@Module({
    imports: [ConfigModule.forRoot(getConfigModuleConfig()), AuthenticationModule, UsersManagementModule],
    controllers: []
})
export class ApiGatewayModule {}
