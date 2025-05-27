import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getRabbitMqConfig } from "common/config";
import { INJECTION_TOKEN } from "./constants";
import { RmqClient } from "./rmq.client";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: INJECTION_TOKEN,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => getRabbitMqConfig(configService)
            }
        ])
    ],
    providers: [RmqClient],
    exports: [RmqClient]
})
export class RmqModule {}
