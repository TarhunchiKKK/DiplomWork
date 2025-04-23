import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkflowParticipant } from "./entities/workflow-participant.entity";

@Injectable()
export class WorkflowParticipantsService {
    public constructor(
        @InjectRepository(WorkflowParticipant)
        private readonly participantsRepository: WorkflowParticipant
    ) {}
}
