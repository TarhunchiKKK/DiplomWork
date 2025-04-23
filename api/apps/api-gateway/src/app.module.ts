import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { OrganizationsModule } from "./organizations/organizations.module";
import { AppController } from "./app.controller";
import { NotificationsModule } from "./notifications/notifications.module";
import { GoogleRecaptchaModule } from "@nestlab/google-recaptcha";
import { getRecaptchaConfig } from "common/config";
import { DocumentsModule } from "./documents/documents.module";
import { WorkflowsModule } from "./workflows/workflows.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        UsersModule,
        OrganizationsModule,
        NotificationsModule,
        DocumentsModule,
        WorkflowsModule,
        GoogleRecaptchaModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getRecaptchaConfig
        })
    ],
    controllers: [AppController]
})
export class AppModule {}
