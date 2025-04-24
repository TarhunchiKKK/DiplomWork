import { Body, Controller, Put, UseGuards } from "@nestjs/common";
import { IUpsertWorkflowParticipantsDto, WorkflowParticipantsGrpcService } from "common/grpc";
import { AuthenticationGuard, ExtractFromRequest } from "common/middleware";
import { WorkflowCreatorGuard } from "../middleware/workflow-creator.guard";

@Controller("/workflows/participants")
@UseGuards(AuthenticationGuard)
export class WorkflowParticipantsController {
    public constructor(private readonly participantsGrpcService: WorkflowParticipantsGrpcService) {}

    @Put(":workflowId")
    @ExtractFromRequest(request => request.body.workflowId)
    @UseGuards(WorkflowCreatorGuard)
    public upsertWorkflowParticipants(@Body() dto: IUpsertWorkflowParticipantsDto) {
        return this.participantsGrpcService.call("upsertWorkflowParticipants", dto);
    }
}
