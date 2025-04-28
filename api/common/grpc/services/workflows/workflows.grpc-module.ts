import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { WORKFLOWS_PACKAGE_NAME } from "common/grpc/generated";
import { WorkflowsGrpcService } from "./services/workflows.grpc.service";
import { WorkflowParticipantsGrpcService } from "./services/workflow-participants.grpc-service";
import { ApprovalsGrpcService } from "./services/approvals.grpc-service";

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
    providers: [WorkflowsGrpcService, WorkflowParticipantsGrpcService, ApprovalsGrpcService],
    exports: [WorkflowsGrpcService, WorkflowParticipantsGrpcService, ApprovalsGrpcService]
})
export class WorkflowsGrpcModule {}
