import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkflowParticipant } from "./entities/workflow-participant.entity";
import { In, Repository } from "typeorm";
import { ICreateParticipantDto } from "./dto/create-participant.dto";
import { IUpdateParticipantDto } from "./dto/update-participant.dto";
import { IUpsertWorkflowParticipantsDto } from "common/grpc";
import { diffParticipants } from "./helpers/upserting.helpers";

@Injectable()
export class WorkflowParticipantsService {
    public constructor(
        @InjectRepository(WorkflowParticipant)
        private readonly participantsRepository: Repository<WorkflowParticipant>
    ) {}

    private async createMany(dtos: ICreateParticipantDto[]) {
        const participants = await this.participantsRepository.save(dtos);

        if (participants.length) {
        }
    }

    public async findAllUserWorkflows(userId: string) {
        const participants = await this.participantsRepository.find({
            where: {
                userId: userId
            }
        });

        return participants.map(participant => participant.workflow);
    }

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
            const dto = dtos.find(dto => dto.id === participant.id);

            if (dto) {
                Object.assign(participant, dto);
            }
        });

        await this.participantsRepository.save(participants);
    }

    public async upsertWorkflowParticipants(
        workflowId: string,
        participants: IUpsertWorkflowParticipantsDto["participants"]
    ) {
        const existingParticipants = await this.participantsRepository.find({
            where: {
                workflow: {
                    id: workflowId
                }
            },
            relations: {
                workflow: true
            }
        });

        const { create, update, remove } = diffParticipants(existingParticipants, participants);

        await Promise.all([
            this.createMany(
                create.map(participant => ({
                    ...participant,
                    workflow: {
                        id: workflowId
                    }
                })) as ICreateParticipantDto[]
            ),
            this.updateMany(
                update.map(participant => ({
                    ...participant,
                    workflow: {
                        id: workflowId
                    }
                })) as IUpdateParticipantDto[]
            ),
            this.deleteMany(remove.map(participant => participant.id))
        ]);
    }

    private async deleteMany(ids: string[]) {
        const participants = await this.participantsRepository.find({
            where: {
                id: In(ids)
            }
        });

        await Promise.all(participants.map(participant => this.participantsRepository.delete(participant)));
    }
}
