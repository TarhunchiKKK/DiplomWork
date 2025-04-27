import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { WorkflowParticipantsGrpcService } from "common/grpc";
import { AuthenticationGuard, ExtractFromRequest } from "common/middleware";
import { WorkflowCreatorGuard } from "../middleware/workflow-creator.guard";
import { UpsertWorkflowParticipantsDto } from "./dto/uspers-workflow-participants.dto";

@Controller("/workflows/participants")
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

    @Get("/user/:userId")
    public async findAllUserWorkflows(@Param("userId") userId: string) {
        return this.participantsGrpcService.call("findAllUserWorkflows", {
            id: userId
        });
    }
}
