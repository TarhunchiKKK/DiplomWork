import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Approval } from "./entities/workflow-approval.entity";
import { ApprovalsController } from "./approvals.controller";
import { ApprovalsService } from "./approvals.service";
import { ApprovalsEventsObserver } from "./approvals-events.observer";
import { WorkflowParticipantsModule } from "../participants/workflow-participants.module";
import { UsersGrpcModule } from "common/grpc";
import { NotificationsRmqModule } from "common/rabbitmq";

@Module({
    imports: [
        TypeOrmModule.forFeature([Approval]),
        WorkflowParticipantsModule,
        UsersGrpcModule,
        NotificationsRmqModule
    ],
    controllers: [ApprovalsController],
    providers: [ApprovalsService, ApprovalsEventsObserver],
    exports: [ApprovalsService]
})
export class ApprovalsModule {}
