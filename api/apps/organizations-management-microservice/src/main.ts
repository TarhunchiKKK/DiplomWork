import { NestFactory } from "@nestjs/core";
import { OrganizationsManagementMicroserviceModule } from "./organizations-management-microservice.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(OrganizationsManagementMicroserviceModule);

    const configService = app.get(ConfigService);

    await app.listen(configService.getOrThrow<number>("ORGANIZATIONS_MANAGEMENT_MICROSERVICE_PORT"));

    console.info(`Organizations Management Microservice is running on: ${await app.getUrl()}`);
}

bootstrap();
