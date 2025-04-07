import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { NOTIFICATIONS_PACKAGE_NAME } from "common/grpc/generated";
import { NotificationsGrpcService } from "./notifications.grpc-service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: NOTIFICATIONS_PACKAGE_NAME,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => getGrpcConfig(configService, NOTIFICATIONS_PACKAGE_NAME)
            }
        ])
    ],
    providers: [NotificationsGrpcService],
    exports: [NotificationsGrpcService]
})
export class NotificationsGrpcModule {}
