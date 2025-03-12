import { NestFactory } from "@nestjs/core";
import { AuthenticationModule } from "./authentication.module";
import { MicroserviceOptions } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { getGrpcConfig } from "common/config";
import { PACKAGE_NAME } from "./constants";

async function bootstrap() {
    const app = await NestFactory.create(AuthenticationModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>(getGrpcConfig(configService, PACKAGE_NAME));

    await app.startAllMicroservices();

    await app.listen(3001);
}

bootstrap();
