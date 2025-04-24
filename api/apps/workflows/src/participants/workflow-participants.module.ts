import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkflowParticipant } from "./entities/workflow-participant.entity";
import { WorkflowParticipantsController } from "./workflow-participants.controller";
import { WorkflowParticipantsService } from "./workflow-participants.service";

@Module({
    imports: [TypeOrmModule.forFeature([WorkflowParticipant])],
    controllers: [WorkflowParticipantsController],
    providers: [WorkflowParticipantsService]
})
export class WorkflowParticipantsModule {}
