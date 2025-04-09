import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { USERS_PACKAGE_NAME } from "common/grpc";
import { UsersGrpcService } from "./users.grpc-service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: USERS_PACKAGE_NAME,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => getGrpcConfig(configService, USERS_PACKAGE_NAME)
            }
        ])
    ],
    providers: [UsersGrpcService],
    exports: [UsersGrpcService]
})
export class UsersGrpcModule {}
