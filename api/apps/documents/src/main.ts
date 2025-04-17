import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { DOCUMENTS_PACKAGE_NAME, GrpcExceptionFilter } from "common/grpc";
import { MicroserviceOptions } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>(getGrpcConfig(configService, DOCUMENTS_PACKAGE_NAME));

    app.useGlobalFilters(new GrpcExceptionFilter());

    await app.startAllMicroservices();

    await app.listen(configService.getOrThrow<number>("DOCUMENTS_MICROSERVICE_PORT"));

    console.info(`Documents Management Microservice is running on: ${await app.getUrl()}`);
}

bootstrap();
