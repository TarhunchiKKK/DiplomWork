import { ConfigService } from "@nestjs/config";
import { RmqOptions, Transport } from "@nestjs/microservices";

export function getRabbitMqConfig(configService: ConfigService): RmqOptions {
    return {
        transport: Transport.RMQ,
        options: {
            urls: [configService.getOrThrow<string>("RABBITMQ_URL")],
            queue: configService.getOrThrow<string>("RABBIT_MQ_QUEUE")
        }
    };
}
