import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Approval } from "./entities/workflow-approval.entity";
import { Repository } from "typeorm";

@Injectable()
export class ApprovalsService {
    public constructor(@InjectRepository(Approval) private readonly approvalsRepository: Repository<Approval>) {}
}
