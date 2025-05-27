import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { WORKFLOWS_PACKAGE_NAME } from "common/grpc";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>(getGrpcConfig(configService, WORKFLOWS_PACKAGE_NAME));

    await app.startAllMicroservices();

    await app.listen(configService.getOrThrow<number>("WORKFLOWS_MICROSERVICE_PORT"));

    console.info(`Workflows Management Microservice is running on: ${await app.getUrl()}`);
}

bootstrap();
