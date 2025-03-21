import { NestFactory } from "@nestjs/core";
import { NotificationsMicroserviceModule } from "./notifications-microservice.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(NotificationsMicroserviceModule);

    const configService = app.get(ConfigService);

    await app.listen(configService.getOrThrow<number>("NOTIFICATIONS_MICROSERVICE_PORT"));

    console.info(`Notifications Microservice is running on: ${await app.getUrl()}`);
}

bootstrap();
