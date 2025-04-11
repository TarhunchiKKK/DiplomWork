import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NotificationsModule } from "./notifications/notifications.module";
import { UserNotificationsModule } from "./user-notifications/user-notifications.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        NotificationsModule,
        UserNotificationsModule
    ]
})
export class AppModule {}
