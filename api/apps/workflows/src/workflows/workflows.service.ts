import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Workflow } from "./entities/workflow.entity";
import { Repository } from "typeorm";
import { ICreateWorkflowDto } from "common/grpc";
import { UpdateWorkflowDto } from "./dto/update-workflow-dto";
import { WorkflowStatus } from "./enums/workflow-status.enum";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { WorkflowDeletedEvent } from "./events/workflow-deleted.event";
import { WorkflowCompletedEvent } from "./events/workflow-completeed.events";

@Injectable()
export class WorkflowsService {
    public constructor(
        @InjectRepository(Workflow) private readonly workflowsRepository: Repository<Workflow>,
        private readonly eventEmitter: EventEmitter2
    ) {}

    public async create(dto: ICreateWorkflowDto) {
        const existingWorkflow = await this.workflowsRepository.findOne({
            where: {
                documentId: dto.documentId
            }
        });

        if (existingWorkflow) {
            throw new BadRequestException("Маршрут для этого документа уже существует");
        }

        return this.workflowsRepository.save(dto);
    }

    public async start(workflowId: string) {
        const workflow = await this.findOneById(workflowId);

        if (workflow.participants.length === 0) {
            throw new BadRequestException("Добавьте участников");
        } else if (!workflow.signerId) {
            throw new BadRequestException("Добавьте подписывающего");
        }

        await this.update(workflow.id, { status: WorkflowStatus.STARTED });
    }

    public async sign(workflowId: string) {
        await this.update(workflowId, { status: WorkflowStatus.COMPLETED, completedAt: new Date() });

        this.eventEmitter.emit(WorkflowCompletedEvent.pattern, new WorkflowCompletedEvent(workflowId));
    }

    public async findAllByCreatorId(creatorId: string) {
        return await this.workflowsRepository.find({
            where: {
                creatorId: creatorId
            }
        });
    }

    public async findOneById(workflowId: string) {
        const workflow = await this.workflowsRepository.findOne({
            where: {
                id: workflowId
            },
            relations: {
                participants: true
            }
        });

        if (!workflow) {
            throw new NotFoundException("Маршрут не найден");
        }

        return workflow;
    }

    public async findOneByDocumentId(workflowId: string) {
        const workflow = await this.workflowsRepository.findOne({
            where: {
                documentId: workflowId
            },
            relations: {
                participants: true
            }
        });

        if (!workflow) {
            throw new NotFoundException("Маршрут для этого документа не найден");
        }

        return workflow;
    }

    public async update(workflowId: string, dto: UpdateWorkflowDto) {
        const workflow = await this.findOneById(workflowId);

        Object.assign(workflow, dto);

        await this.workflowsRepository.save(workflow);
    }

    public async delete(workflowId: string) {
        const workflow = await this.findOneById(workflowId);

        this.eventEmitter.emit(
            WorkflowDeletedEvent.pattern,
            new WorkflowDeletedEvent(
                workflow.documentTitle,
                workflow.participants.map(p => p.id)
            )
        );

        await this.workflowsRepository.delete(workflow);
    }
}
