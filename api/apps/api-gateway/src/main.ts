import { NestFactory } from "@nestjs/core";
import { ApiGatewayModule } from "./api-gateway.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle("API Gateway")
        .setDescription("API Gateway for the application")
        .setVersion("1.0.0")
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api", app, documentFactory);
}

async function bootstrap() {
    const app = await NestFactory.create(ApiGatewayModule);

    setupSwagger(app);

    await app.listen(process.env.port ?? 3000);
}
bootstrap();
