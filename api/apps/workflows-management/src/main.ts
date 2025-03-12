import { NestFactory } from "@nestjs/core";
import { WorkflowsManagementModule } from "./workflows-management.module";

async function bootstrap() {
    const app = await NestFactory.create(WorkflowsManagementModule);
    await app.listen(process.env.port ?? 3000);
}
bootstrap();
