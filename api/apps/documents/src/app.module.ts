import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentsModule } from "./documents/documents.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                database: configService.getOrThrow<string>("DOCUMENTS_MICROSERVICE_DB_NAME"),
                host: configService.getOrThrow<string>("DOCUMENTS_MICROSERVICE_DB_HOST"),
                port: +configService.getOrThrow<number>("DOCUMENTS_MICROSERVICE_DB_PORT"),
                username: configService.getOrThrow<string>("DOCUMENTS_MICROSERVICE_DB_USER"),
                password: configService.getOrThrow<string>("DOCUMENTS_MICROSERVICE_DB_PASSWORD"),
                synchronize: true,
                entities: [Document]
            })
        }),
        DocumentsModule
    ]
})
export class AppModule {}
