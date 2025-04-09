import { ConfigService } from "@nestjs/config";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { RabbitMqInfo } from "common/rabbitmq";

export function getRabbitMqConfig(configService: ConfigService, queue: keyof typeof RabbitMqInfo): RmqOptions {
    const rabbitMqInfo = RabbitMqInfo[queue];

    return {
        transport: Transport.RMQ,
        options: {
            urls: [configService.getOrThrow<string>("RABBITMQ_URL")],
            queue: rabbitMqInfo.queue,
            queueOptions: {
                durable: false
            },
            socketOptions: {
                connectionOptions: {}
            }
        }
    };
}
