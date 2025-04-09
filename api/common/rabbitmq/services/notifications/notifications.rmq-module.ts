import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getRabbitMqConfig } from "common/config";
import { NotificationsRmqService } from "./notifications.rmq-service";
import { NOTIFICATIONS_RMQ_SERVICE } from "common/rabbitmq/constants/services.constants";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: NOTIFICATIONS_RMQ_SERVICE,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) =>
                    getRabbitMqConfig(configService, NOTIFICATIONS_RMQ_SERVICE)
            }
        ])
    ],
    providers: [NotificationsRmqService],
    exports: [NotificationsRmqService]
})
export class NotificationsRmqModule {}
