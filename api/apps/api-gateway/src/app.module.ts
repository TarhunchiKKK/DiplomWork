import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UsersManagementModule } from "./users-management/users-management.module";
import { OrganizationsManagementModule } from "./organizations-management/organizations-management.module";
import { AppController } from "./app.controller";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthenticationModule,
        OrganizationsManagementModule,
        UsersManagementModule
    ],
    controllers: [AppController]
})
export class AppModule {}
