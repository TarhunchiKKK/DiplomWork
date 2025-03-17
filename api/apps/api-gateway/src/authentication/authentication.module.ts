import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { AUTHENTICATION_PACKAGE_NAME } from "common/grpc";
import { AuthenticationGrpcService } from "./authentication.grpc-service";
import { AuthenticationGrpcController } from "./authentication.grpc-controller";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: AUTHENTICATION_PACKAGE_NAME,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => getGrpcConfig(configService, AUTHENTICATION_PACKAGE_NAME)
            }
        ])
    ],
    controllers: [AuthenticationGrpcController],
    providers: [AuthenticationGrpcService],
    exports: [AuthenticationGrpcService]
})
export class AuthenticationModule {}
