import { NestFactory } from "@nestjs/core";
import { WorkflowsManagementMicroserviceModule } from "./workflows-management-microservice.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(WorkflowsManagementMicroserviceModule);

    const configService = app.get(ConfigService);

    await app.listen(configService.getOrThrow<number>("WORKFLOWS_MANAGEMENT_MICROSERVICE_PORT"));

    console.info(`Workflows Management Microservice is running on: ${await app.getUrl()}`);
}

bootstrap();
