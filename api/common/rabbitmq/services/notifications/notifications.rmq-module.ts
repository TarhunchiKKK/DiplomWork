import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getRabbitMqConfig } from "common/config";
import { NOTIFICATIONS_QUEUE } from "common/rabbitmq/constants";
import { NotificationsRmqService } from "./notifications.rmq-service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: NOTIFICATIONS_QUEUE,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => getRabbitMqConfig(configService, NOTIFICATIONS_QUEUE)
            }
        ])
    ],
    providers: [NotificationsRmqService],
    exports: [NotificationsRmqService]
})
export class NotificationsRmqModule {}
