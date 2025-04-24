import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkflowParticipant } from "./entities/workflow-participant.entity";
import { WorkflowParticipantsController } from "./workflow-participants.controller";
import { WorkflowParticipantsService } from "./workflow-participants.service";
import { WorkflowsModule } from "../workflows/workflows.module";

@Module({
    imports: [TypeOrmModule.forFeature([WorkflowParticipant]), WorkflowsModule],
    controllers: [WorkflowParticipantsController],
    providers: [WorkflowParticipantsService]
})
export class WorkflowParticipantsModule {}
