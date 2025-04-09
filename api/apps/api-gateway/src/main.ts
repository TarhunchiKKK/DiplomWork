import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle("Защищённый сервис электронного документооборота")
        .setDescription(
            "Данная документация описавыет маршруты API Gateway для микросовервисного приложения. С помощью данного API можно управлять пользователями, настройками организаций, электронными документами и маршрутами согласования электронных документов. "
        )
        .setVersion("1.0.0")
        .setContact("Konstantin Barilo", "https://github.com/TarhunchiKKK", "kostabarilo12@gmail.com")
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api", app, documentFactory);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    setupSwagger(app);

    const configService = app.get(ConfigService);

    await app.listen(configService.getOrThrow<number>("API_GATEWAY_PORT"));

    // await app.listen(3000)

    console.info(`API Gateway is running on: ${await app.getUrl()}`);
}

bootstrap();
