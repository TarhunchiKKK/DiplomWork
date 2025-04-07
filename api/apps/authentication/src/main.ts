import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { getGrpcConfig } from "common/config";
import { AUTHENTICATION_PACKAGE_NAME } from "common/grpc";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>(getGrpcConfig(configService, AUTHENTICATION_PACKAGE_NAME));

    await app.startAllMicroservices();

    await app.listen(configService.getOrThrow<number>("AUTHENTICATION_MICROSERVICE_PORT"));

    console.info(`Authentication Microservice is running on: ${await app.getUrl()}`);
}

bootstrap();
