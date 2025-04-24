import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkflowParticipant } from "./entities/workflow-participant.entity";
import { In, Repository } from "typeorm";
import { splitIncomingParticipants } from "./helpers/participants.helpers";
import { IUpdateParticipantDto } from "./dto/update-participant.dto";
import lodash from "lodash";
import { ISaveParticipantDto } from "./dto/save-participant.dto";

@Injectable()
export class WorkflowParticipantsService {
    public constructor(
        @InjectRepository(WorkflowParticipant)
        private readonly participantsRepository: Repository<WorkflowParticipant>
    ) {}

    private async updateMany(dtos: IUpdateParticipantDto[]) {
        const participants = await this.participantsRepository.find({
            where: {
                id: In(dtos.map(dto => dto.id))
            },
            relations: {
                workflow: true
            }
        });

        participants.forEach(participant => {
            const dto = dtos.find(d => d.id === participant.id);

            if (dto) {
                Object.assign(participant, lodash.omit(dto, ["id"]));
            }
        });

        await this.participantsRepository.save(participants);
    }

    public async upsertMany(workflowId: string, participants: ISaveParticipantDto[]) {
        const { create, update } = splitIncomingParticipants(workflowId, participants);

        await Promise.all([this.participantsRepository.save(create), this.updateMany(update)]);
    }
}
