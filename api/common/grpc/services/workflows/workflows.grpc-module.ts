import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { WORKFLOWS_PACKAGE_NAME } from "common/grpc/generated";
import { WorkflowsGrpcService } from "./workflows.grpc.service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: WORKFLOWS_PACKAGE_NAME,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => getGrpcConfig(configService, WORKFLOWS_PACKAGE_NAME)
            }
        ])
    ],
    providers: [WorkflowsGrpcService],
    exports: [WorkflowsGrpcService]
})
export class WorkflowsGrpcModule {}
