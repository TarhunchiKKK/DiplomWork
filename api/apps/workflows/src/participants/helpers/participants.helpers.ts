import { WorkflowParticipantRole } from "../enums/workflow-participant-role.enum";
import { ISaveParticipantDto } from "../dto/save-participant.dto";

export const splitIncomingParticipants = (workflowId: string, participants: ISaveParticipantDto[]) => {
    const participantsToUpdate = participants
        .filter(participant => !!participant.id)
        .map(participant => ({
            id: participant.id,
            userId: participant.userId,
            role: participant.role as WorkflowParticipantRole,
            workflow: {
                id: workflowId
            }
        }));

    const participantsToCreate = participants
        .filter(participant => !participant.id)
        .map(participant => ({
            userId: participant.userId,
            role: participant.role as WorkflowParticipantRole,
            workflow: {
                id: workflowId
            }
        }));

    return {
        update: participantsToUpdate,
        create: participantsToCreate
    };
};
