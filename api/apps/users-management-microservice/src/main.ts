import { NestFactory } from "@nestjs/core";
import { UsersManagementMicroserviceModule } from "./users-management-microservice.module";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { USERS_MANAGEMENT_PACKAGE_NAME } from "common/grpc";

async function bootstrap() {
    const app = await NestFactory.create(UsersManagementMicroserviceModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>(getGrpcConfig(configService, USERS_MANAGEMENT_PACKAGE_NAME));

    await app.startAllMicroservices();

    await app.listen(configService.getOrThrow<number>("USERS_MANAGEMENT_MICROSERVICE_PORT"));

    console.info(`Users Management Microservice is running on: ${await app.getUrl()}`);
}

bootstrap();
