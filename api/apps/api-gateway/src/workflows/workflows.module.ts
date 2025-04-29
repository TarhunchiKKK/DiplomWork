import { Module } from "@nestjs/common";
import { DocumentsGrpcModule, WorkflowsGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { WorkflowsController } from "./workflows.controller";
import { WorkflowParticipantsModule } from "./participants/workflow-participants.module";
import { ApprovalsModule } from "./approvals/approvals.module";

@Module({
    imports: [WorkflowsGrpcModule, DocumentsGrpcModule, JwtTokensModule, WorkflowParticipantsModule, ApprovalsModule],
    controllers: [WorkflowsController]
})
export class WorkflowsModule {}
