import { IUpsertWorkflowParticipantsDto } from "common/grpc";
import { WorkflowParticipant } from "../../participants/entities/workflow-participant.entity";

type TDiffFunction = (_: WorkflowParticipant[], __: IUpsertWorkflowParticipantsDto["participants"]) => unknown;

const findParticipantsToUpdate: TDiffFunction = (oldParticipants, newParticipants) => {
    return oldParticipants.filter(
        oldParticipant => !!newParticipants.find(participant => participant.id === oldParticipant.id)
    );
};

const findParticipantsToCreate: TDiffFunction = (oldParticipants, newParticiants) => {
    return newParticiants.filter(
        newParticipant => !oldParticipants.find(oldParticipant => oldParticipant.id === newParticipant.id)
    );
};

const findParticipantsToDelete: TDiffFunction = (oldParticipants, newParticiants) => {
    return oldParticipants.filter(
        oldParticipant => !newParticiants.find(newParticipant => newParticipant.id === oldParticipant.id)
    );
};

export const diffParticipants = (
    old: WorkflowParticipant[],
    incoming: IUpsertWorkflowParticipantsDto["participants"]
) => {
    return {
        create: findParticipantsToCreate(old, incoming) as IUpsertWorkflowParticipantsDto["participants"],
        update: findParticipantsToUpdate(old, incoming) as IUpsertWorkflowParticipantsDto["participants"],
        remove: findParticipantsToDelete(old, incoming) as WorkflowParticipant[]
    };
};
