import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NotificationsModule } from "./notifications/notifications.module";
import { UserNotificationsModule } from "./user/user-notifications.module";
import { DocumentNotificationsModule } from "./document/document-notifications.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        NotificationsModule,
        UserNotificationsModule,
        DocumentNotificationsModule
    ]
})
export class AppModule {}
