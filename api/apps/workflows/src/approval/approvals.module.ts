import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Approval } from "./entities/workflow-approval.entity";
import { ApprovalsController } from "./approvals.controller";
import { ApprovalsService } from "./approvals.service";

@Module({
    imports: [TypeOrmModule.forFeature([Approval])],
    controllers: [ApprovalsController],
    providers: [ApprovalsService]
})
export class ApprovalsModule {}
