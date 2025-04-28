import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkflowParticipant } from "./entities/workflow-participant.entity";
import { WorkflowParticipantsController } from "./workflow-participants.controller";
import { WorkflowParticipantsService } from "./workflow-participants.service";
import { WorkflowsModule } from "../workflows/workflows.module";
import { WorkflowParticipantsObserver } from "./workflow-participants.observer";
import { DocumentsGrpcModule, UsersGrpcModule } from "common/grpc";
import { NotificationsRmqModule } from "common/rabbitmq";

@Module({
    imports: [
        TypeOrmModule.forFeature([WorkflowParticipant]),
        WorkflowsModule,
        DocumentsGrpcModule,
        UsersGrpcModule,
        NotificationsRmqModule
    ],
    controllers: [WorkflowParticipantsController],
    providers: [WorkflowParticipantsService, WorkflowParticipantsObserver],
    exports: [WorkflowParticipantsService]
})
export class WorkflowParticipantsModule {}
