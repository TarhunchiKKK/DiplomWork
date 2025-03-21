import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { OrganizationsModule } from "./organizations/organizations.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.getOrThrow<string>("ORGANIZATIONS_MANAGEMENT_DB_URI")
            })
        }),
        OrganizationsModule
    ]
})
export class AppModule {}
