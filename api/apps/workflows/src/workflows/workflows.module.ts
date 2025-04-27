import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Workflow } from "./entities/workflow.entity";
import { WorkflowsController } from "./workflows.controller";
import { WorkflowsService } from "./workflows.service";
import { DocumentsGrpcModule, UsersGrpcModule } from "common/grpc";
import { WorkflowsEventsObserver } from "./workflows-events.observer";
import { NotificationsRmqModule } from "common/rabbitmq";

@Module({
    imports: [TypeOrmModule.forFeature([Workflow]), DocumentsGrpcModule, UsersGrpcModule, NotificationsRmqModule],
    controllers: [WorkflowsController],
    providers: [WorkflowsService, WorkflowsEventsObserver],
    exports: [WorkflowsService]
})
export class WorkflowsModule {}
