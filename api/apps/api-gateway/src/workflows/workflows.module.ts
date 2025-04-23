import { Module } from "@nestjs/common";
import { WorkflowsGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { WorkflowsController } from "./workflows.controller";

@Module({
    imports: [WorkflowsGrpcModule, JwtTokensModule],
    controllers: [WorkflowsController]
})
export class WorkflowsModule {}
