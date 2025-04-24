import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkflowParticipant } from "./entities/workflow-participant.entity";
import { Repository } from "typeorm";

@Injectable()
export class WorkflowParticipantsService {
    public constructor(
        @InjectRepository(WorkflowParticipant)
        private readonly participantsRepository: Repository<WorkflowParticipant>
    ) {}
}
