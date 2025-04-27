import { IUpsertWorkflowParticipantDto, IUpsertWorkflowParticipantsDto } from "common/grpc";
import { IgnoreFields } from "common/utils";

export class UpsertWorkflowParticipantsDto implements IgnoreFields<IUpsertWorkflowParticipantsDto, "workflowId"> {
    participants: IUpsertWorkflowParticipantDto[];
}
