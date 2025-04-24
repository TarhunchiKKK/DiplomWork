import { Module } from "@nestjs/common";
import { WorkflowsGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { WorkflowParticipantsController } from "./workflow-participants.controller";

@Module({
    imports: [WorkflowsGrpcModule, JwtTokensModule],
    controllers: [WorkflowParticipantsController]
})
export class WorkflowParticipantsModule {}
