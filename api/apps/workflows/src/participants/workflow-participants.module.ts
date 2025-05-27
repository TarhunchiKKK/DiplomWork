import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkflowParticipant } from "./entities/workflow-participant.entity";
import { WorkflowParticipantsController } from "./workflow-participants.controller";
import { WorkflowParticipantsService } from "./workflow-participants.service";
import { WorkflowParticipantsObserver } from "./workflow-participants.observer";
import { UsersGrpcModule } from "common/grpc";
import { RmqModule } from "common/rabbitmq";

@Module({
    imports: [TypeOrmModule.forFeature([WorkflowParticipant]), UsersGrpcModule, RmqModule],
    controllers: [WorkflowParticipantsController],
    providers: [WorkflowParticipantsService, WorkflowParticipantsObserver],
    exports: [WorkflowParticipantsService]
})
export class WorkflowParticipantsModule {}
