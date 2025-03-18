import { NestFactory } from "@nestjs/core";
import { OrganizationsManagementModule } from "./organizations-management.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(OrganizationsManagementModule);

    const configService = app.get(ConfigService);

    await app.listen(configService.getOrThrow<number>("ORGANIZATIONS_MANAGEMENT_MICROSERVICE_PORT"));
}

bootstrap();
