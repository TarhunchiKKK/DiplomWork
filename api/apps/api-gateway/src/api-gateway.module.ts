import { Module } from "@nestjs/common";
import { ApiGatewayController } from "./api-gateway.controller";
import { ClientsModule } from "@nestjs/microservices";
import { AuthenticationGrpcService } from "./services";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConfigModuleConfig, getGrpcConfig } from "common/config";
import { AUTHENTICATION_PACKAGE_NAME } from "common/grpc";

@Module({
    imports: [
        ConfigModule.forRoot(getConfigModuleConfig()),
        ClientsModule.registerAsync([
            {
                name: AUTHENTICATION_PACKAGE_NAME,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => getGrpcConfig(configService, AUTHENTICATION_PACKAGE_NAME)
            }
        ])
    ],
    controllers: [ApiGatewayController],
    providers: [AuthenticationGrpcService]
})
export class ApiGatewayModule {}
