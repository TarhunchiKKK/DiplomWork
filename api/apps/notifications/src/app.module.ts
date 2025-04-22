import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { NotificationsModule } from "./notifications/notifications.module";
import { UserNotificationsModule } from "./user/user-notifications.module";
import { DocumentNotificationsModule } from "./document/document-notifications.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "./notifications/entities/notification.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                database: configService.getOrThrow<string>("NOTIFICATIONS_MICROSERVICE_DB_NAME"),
                host: configService.getOrThrow<string>("NOTIFICATIONS_MICROSERVICE_DB_HOST"),
                port: +configService.getOrThrow<number>("NOTIFICATIONS_MICROSERVICE_DB_PORT"),
                username: configService.getOrThrow<string>("NOTIFICATIONS_MICROSERVICE_DB_USER"),
                password: configService.getOrThrow<string>("NOTIFICATIONS_MICROSERVICE_DB_PASSWORD"),
                synchronize: true,
                entities: [Notification]
            })
        }),

        NotificationsModule,
        UserNotificationsModule,
        DocumentNotificationsModule
    ]
})
export class AppModule {}
