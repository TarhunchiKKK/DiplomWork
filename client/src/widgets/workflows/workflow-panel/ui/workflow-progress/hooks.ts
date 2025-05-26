import { useOrganizationUsers } from "@/entities/users";
import { getContent } from "@/widgets/workflows/shared";
import { TProps } from "./types";

export function useWorkflowProgress(participants: TProps["participants"]) {
    const { data: users } = useOrganizationUsers();

    const displayedParticipants = (participants || []).map(participant => {
        const user = (users || []).find(u => u.id === participant.id);

        return {
            id: participant.id,
            displayName: getContent(user)!,
            status: participant.approvalStatus
        };
    });

    return { displayedParticipants };
}
