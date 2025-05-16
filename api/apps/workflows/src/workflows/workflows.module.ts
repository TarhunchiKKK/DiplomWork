import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Workflow } from "./entities/workflow.entity";
import { WorkflowsController } from "./workflows.controller";
import { WorkflowsService } from "./workflows.service";
import { UsersGrpcModule } from "common/grpc";
import { NotificationsRmqModule } from "common/rabbitmq";
import { WorkflowCrudObserver } from "./observers/workflow-crud.observer";
import { WorkflowStatusObserver } from "./observers/workflow-status.observer";
import { WorkflowParticipantsModule } from "../participants/workflow-participants.module";
import { ApprovalsModule } from "../approval/approvals.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Workflow]),
        UsersGrpcModule,
        NotificationsRmqModule,
        WorkflowParticipantsModule,
        ApprovalsModule
    ],
    controllers: [WorkflowsController],
    providers: [WorkflowsService, WorkflowCrudObserver, WorkflowStatusObserver],
    exports: [WorkflowsService]
})
export class WorkflowsModule {}
