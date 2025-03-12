import { NestFactory } from "@nestjs/core";
import { UsersManagementModule } from "./users-management.module";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { PACKAGE_NAME } from "./constants";

async function bootstrap() {
    const app = await NestFactory.create(UsersManagementModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>(getGrpcConfig(configService, PACKAGE_NAME));

    await app.startAllMicroservices();

    await app.listen(process.env.port ?? 3002);
}

bootstrap();
