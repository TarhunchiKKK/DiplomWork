import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { OrganizationsModule } from "./organizations/organizations.module";
import { AppController } from "./app.controller";
import { NotificationsModule } from "./notifications/notifications.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        UsersModule,
        OrganizationsModule,
        NotificationsModule
    ],
    controllers: [AppController]
})
export class AppModule {}
