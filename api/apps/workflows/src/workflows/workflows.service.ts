import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Workflow } from "./entities/workflow.entity";
import { Repository } from "typeorm";

@Injectable()
export class WorkflowsService {
    public constructor(@InjectRepository(Workflow) private readonly workflowsRepository: Repository<Workflow>) {}
}
