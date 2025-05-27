import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Put,
    Req,
    UseFilters,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { WorkflowParticipantsGrpcService } from "common/grpc";
import { AuthenticationGuard, ExtractFromRequest, GatewayExceptionFilter } from "common/middleware";
import { WorkflowCreatorGuard } from "../middleware/workflow-creator.guard";
import { UpsertWorkflowParticipantsDto } from "./dto/uspers-workflow-participants.dto";
import { UpdateApprovalStatusDto } from "./dto/update-approval-status.dto";
import { TAuthenticatedRequest } from "common/modules";

@Controller("/workflows/participants")
@UseFilters(GatewayExceptionFilter)
@UseGuards(AuthenticationGuard)
export class WorkflowParticipantsController {
    public constructor(private readonly participantsGrpcService: WorkflowParticipantsGrpcService) {}

    @Put(":workflowId")
    @ExtractFromRequest(request => request.params.workflowId)
    @UseGuards(WorkflowCreatorGuard)
    public upsertWorkflowParticipants(
        @Param("workflowId") workflowId: string,

        @Body() dto: UpsertWorkflowParticipantsDto
    ) {
        return this.participantsGrpcService.call("upsertWorkflowParticipants", {
            ...dto,
            workflowId: workflowId
        });
    }

    @Get("/user-workflows")
    public async findAllUserWorkflows(@Req() request: TAuthenticatedRequest) {
        return this.participantsGrpcService.call("findAllUserWorkflows", {
            id: request.jwtInfo.id
        });
    }

    @Patch(":participantId")
    @UsePipes(ValidationPipe)
    public async updateStatus(@Param("participantId") participantId: string, @Body() dto: UpdateApprovalStatusDto) {
        return this.participantsGrpcService.call("updateApprovalStatus", {
            id: participantId,
            ...dto
        });
    }
}
