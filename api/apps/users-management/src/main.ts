import { NestFactory } from "@nestjs/core";
import { UsersManagementModule } from "./users-management.module";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { USERS_MANAGEMENT_PACKAGE_NAME } from "common/grpc";

async function bootstrap() {
    const app = await NestFactory.create(UsersManagementModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>(getGrpcConfig(configService, USERS_MANAGEMENT_PACKAGE_NAME));

    await app.startAllMicroservices();

    await app.listen(configService.getOrThrow<number>("USERS_MANAGEMENT_MICROSERVICE_PORT"));
}

bootstrap();
