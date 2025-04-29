import { Module } from "@nestjs/common";
import { WorkflowsGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { ApprovalsController } from "./approvals.controller";

@Module({
    imports: [WorkflowsGrpcModule, JwtTokensModule],
    controllers: [ApprovalsController]
})
export class ApprovalsModule {}
