import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Workflow } from "./entities/workflow.entity";
import { WorkflowsController } from "./workflows.controller";
import { WorkflowsService } from "./workflows.service";
import { DocumentsGrpcModule } from "common/grpc";

@Module({
    imports: [TypeOrmModule.forFeature([Workflow]), DocumentsGrpcModule],
    controllers: [WorkflowsController],
    providers: [WorkflowsService],
    exports: [WorkflowsService]
})
export class WorkflowsModule {}
