import { NestFactory } from "@nestjs/core";
import { OrganizationsManagementModule } from "./organizations-management.module";

async function bootstrap() {
    const app = await NestFactory.create(OrganizationsManagementModule);
    await app.listen(process.env.port ?? 3000);
}
bootstrap();
