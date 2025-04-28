import { Body, Controller, Get, Param, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApprovalsGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { UpsertApprovalDto } from "./dto/upsert-approval.dto";

@Controller("/workflows/approvals")
@UseGuards(AuthenticationGuard)
export class ApprovalsController {
    public constructor(private readonly approvalsGrpcService: ApprovalsGrpcService) {}

    @Get("/:workflowId/:participantId")
    public async findOne(@Param("workflowId") workflowId: string, @Param("participantId") participantId: string) {
        return this.approvalsGrpcService.call("findOne", {
            workflowId,
            participantId
        });
    }

    @Put("/:workflowId/:participantId")
    @UsePipes(ValidationPipe)
    public async upsert(
        @Param("workflowId") workflowId: string,
        @Param("participantId") participantId: string,
        @Body() dto: UpsertApprovalDto
    ) {
        return this.approvalsGrpcService.call("upsert", {
            ...dto,
            workflowId,
            participantId
        });
    }
}
