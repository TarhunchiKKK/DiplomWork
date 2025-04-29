import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Approval } from "./entities/workflow-approval.entity";
import { Repository } from "typeorm";
import { IFindOneApprovalDto, IUpsertApprovalDto } from "common/grpc";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ApprovalUpsertedEvent } from "./events/approval-upserted.event";

@Injectable()
export class ApprovalsService {
    public constructor(
        @InjectRepository(Approval) private readonly approvalsRepository: Repository<Approval>,

        private readonly eventEmitter: EventEmitter2
    ) {}

    public async findOne(dto: IFindOneApprovalDto) {
        const approval = await this.approvalsRepository.findOne({
            where: {
                workflow: {
                    id: dto.workflowId
                },
                participant: {
                    id: dto.participantId
                }
            },
            relations: {
                workflow: true,
                participant: true
            }
        });

        if (!approval) {
            throw new NotFoundException("Запись не найдена");
        }

        return approval;
    }

    public async upsert(dto: IUpsertApprovalDto) {
        const { workflowId, participantId, ...data } = dto;

        try {
            const approval = await this.findOne({ workflowId, participantId });
            Object.assign(approval, data);
            return await this.approvalsRepository.save(approval);
        } catch (error: unknown) {
            if (error instanceof NotFoundException) {
                return await this.approvalsRepository.save({
                    ...data,
                    workflow: {
                        id: workflowId
                    },
                    participant: {
                        id: participantId
                    }
                } as Approval);
            } else {
                throw error;
            }
        } finally {
            this.eventEmitter.emit(ApprovalUpsertedEvent.pattern, new ApprovalUpsertedEvent(participantId));
        }
    }
}
