import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Workflow } from "./entities/workflow.entity";
import { Repository } from "typeorm";
import { ICreateWorkflowDto, IFindOneWorkflowByDocumentIdDto, IStartWorkflowDto } from "common/grpc";
import { UpdateWorkflowDto } from "./dto/update-workflow-dto";
import { WorkflowStatus } from "./enums/workflow-status.enum";

@Injectable()
export class WorkflowsService {
    public constructor(@InjectRepository(Workflow) private readonly workflowsRepository: Repository<Workflow>) {}

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

    public async start(dto: IStartWorkflowDto) {
        await this.update(dto.workflowId, { status: WorkflowStatus.STARTED });
    }

    public async findOneById(workflowId: string) {
        const workflow = await this.workflowsRepository.findOne({
            where: {
                id: workflowId
            }
        });

        if (!workflow) {
            throw new NotFoundException("Маршрут не найден");
        }

        return workflow;
    }

    public async findOneByDocumentId(dto: IFindOneWorkflowByDocumentIdDto) {
        const workflow = await this.workflowsRepository.findOne({
            where: {
                documentId: dto.documentId
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

        await this.workflowsRepository.delete(workflow);
    }
}
