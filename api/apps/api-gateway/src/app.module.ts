import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UsersModule } from "./users/users.module";
import { OrganizationsModule } from "./organizations/organizations.module";
import { AppController } from "./app.controller";
import { NotificationsModule } from "./notifications/notifications.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthenticationModule,
        OrganizationsModule,
        UsersModule,
        NotificationsModule
    ],
    controllers: [AppController]
})
export class AppModule {}
