import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkflowParticipant } from "./entities/workflow-participant.entity";
import { In, Repository } from "typeorm";
import { ICreateParticipantDto } from "./dto/create-participant.dto";
import { IUpdateParticipantDto } from "./dto/update-participant.dto";
import { IUpsertWorkflowParticipantDto, IUpsertWorkflowParticipantsDto } from "common/grpc";
import { diffParticipants } from "./helpers/upserting.helpers";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ParticipantsDeletedEvent } from "./events/participants-deleted.event";
import { ParticipantsCreatedEvent } from "./events/participants-created.event";
import { ApprovalStatus } from "./enums/approval.-status.enum";
import { RecalculateWorkflowStatusEvent } from "../workflows/events/recalculate-workflow-status.event";
import { ParticipantsUpsertedRmqEvent, RmqClient } from "common/rabbitmq";

@Injectable()
export class WorkflowParticipantsService {
    public constructor(
        @InjectRepository(WorkflowParticipant)
        private readonly participantsRepository: Repository<WorkflowParticipant>,

        private readonly eventEmitter: EventEmitter2,

        private readonly rmqClient: RmqClient
    ) {}

    private async createMany(dtos: ICreateParticipantDto[]) {
        const participants = await this.participantsRepository.save(dtos);

        if (participants.length) {
            this.eventEmitter.emit(
                ParticipantsCreatedEvent.PATTERN,
                new ParticipantsCreatedEvent(
                    participants.map(p => p.id),
                    participants[0].workflow.documentId
                )
            );
        }

        return participants;
    }

    public async findOneById(participantId: string) {
        const participant = await this.participantsRepository.findOne({
            where: {
                id: participantId
            },
            relations: {
                workflow: true
            }
        });

        if (!participant) {
            throw new NotFoundException("Участник маршрута не найден");
        }

        return participant;
    }

    public async findAllByWorkflowId(workflowId: string) {
        return await this.participantsRepository.find({
            where: {
                workflow: {
                    id: workflowId
                }
            },
            relations: {
                workflow: true
            }
        });
    }

    public async findAllUserWorkflows(userId: string) {
        const participants = await this.participantsRepository.find({
            where: {
                userId: userId
            },
            relations: {
                workflow: true
            }
        });

        return participants.map(participant => participant.workflow);
    }

    public async updateApprovalStatus(participantId: string, approvlaStatus: ApprovalStatus) {
        const participant = await this.findOneById(participantId);

        participant.approvalStatus = approvlaStatus;

        await this.participantsRepository.save(participant);

        this.eventEmitter.emit(
            RecalculateWorkflowStatusEvent.pattern,
            new RecalculateWorkflowStatusEvent(participant.workflow.id)
        );
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

        if (existingParticipants.length !== 0) {
            this.rmqClient.emit(
                new ParticipantsUpsertedRmqEvent(
                    existingParticipants[0].workflow.documentId,
                    participants.map(p => p.id)
                )
            );
        }
    }

    private async deleteMany(ids: string[]) {
        const participants = await this.participantsRepository.find({
            where: {
                id: In(ids)
            },
            relations: {
                workflow: true
            }
        });

        if (participants.length) {
            this.eventEmitter.emit(
                ParticipantsDeletedEvent.PATTERN,
                new ParticipantsDeletedEvent(
                    participants.map(p => p.id),
                    participants[0].workflow.documentId
                )
            );

            await Promise.all(participants.map(participant => this.participantsRepository.delete(participant)));
        }
    }

    public async resetAllByWorkflowId(workflowId: string) {
        const participants = await this.participantsRepository.find({
            where: {
                workflow: {
                    id: workflowId
                }
            },
            relations: {
                workflow: true
            }
        });

        for (const participant of participants) {
            participant.approvalStatus = ApprovalStatus.DEFAULT;
        }

        await this.participantsRepository.save(participants);
    }
}
