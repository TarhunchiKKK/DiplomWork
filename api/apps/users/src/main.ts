import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { getGrpcConfig } from "common/config";
import { GrpcExceptionFilter, InsertGrpcResponseInterceptor, USERS_PACKAGE_NAME } from "common/grpc";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>(getGrpcConfig(configService, USERS_PACKAGE_NAME));

    app.useGlobalInterceptors(new InsertGrpcResponseInterceptor());

    app.useGlobalFilters(new GrpcExceptionFilter());

    await app.startAllMicroservices();

    await app.listen(configService.getOrThrow<number>("USERS_MICROSERVICE_PORT"));

    console.info(`Users Microservice is running on: ${await app.getUrl()}`);
}

bootstrap();
