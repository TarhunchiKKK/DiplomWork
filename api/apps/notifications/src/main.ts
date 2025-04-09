import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions } from "@nestjs/microservices";
import { getRabbitMqConfig } from "common/config";
import { NOTIFICATIONS_RMQ_SERVICE } from "common/rabbitmq";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    // app.connectMicroservice<MicroserviceOptions>(getGrpcConfig(configService, NOTIFICATIONS_PACKAGE_NAME));

    app.connectMicroservice<MicroserviceOptions>(getRabbitMqConfig(configService, NOTIFICATIONS_RMQ_SERVICE));

    await app.startAllMicroservices();

    await app.listen(configService.getOrThrow<number>("NOTIFICATIONS_MICROSERVICE_PORT"));

    console.info(`Notifications Microservice is running on: ${await app.getUrl()}`);
}

bootstrap();
