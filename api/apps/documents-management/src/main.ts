import { NestFactory } from "@nestjs/core";
import { DocumentsManagementModule } from "./documents-management.module";

async function bootstrap() {
    const app = await NestFactory.create(DocumentsManagementModule);
    await app.listen(process.env.port ?? 3000);
}
bootstrap();
