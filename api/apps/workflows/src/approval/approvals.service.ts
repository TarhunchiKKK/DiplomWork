import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Approval } from "./entities/workflow-approval.entity";
import { Repository } from "typeorm";
import { IFindOneApprovalDto, IUpsertApprovalDto } from "common/grpc";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ApprovalUpsertedEvent } from "./events/approval-upserted.event";
import { ApprovalStatus } from "./enums/approval.-status.enum";

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
            const aproval = await this.approvalsRepository.save(approval);

            this.eventEmitter.emit(
                ApprovalUpsertedEvent.pattern,
                new ApprovalUpsertedEvent(approval.workflow.documentTitle, participantId)
            );

            return approval;
        } catch (error: unknown) {
            if (error instanceof NotFoundException) {
                const approval = await this.approvalsRepository.save({
                    ...data,
                    workflow: {
                        id: workflowId
                    },
                    participant: {
                        id: participantId
                    }
                } as Approval);

                this.eventEmitter.emit(
                    ApprovalUpsertedEvent.pattern,
                    new ApprovalUpsertedEvent(approval.workflow.documentTitle, participantId)
                );
            } else {
                throw error;
            }
        }
    }

    public async resetAllByWorkflowId(workflowId: string) {
        await this.approvalsRepository.update(
            {
                workflow: {
                    id: workflowId
                }
            },
            {
                status: ApprovalStatus.DEFAULT
            }
        );
    }
}
