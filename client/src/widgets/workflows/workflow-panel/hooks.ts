import { useOrganizationUsers } from "@/entities/users";
import { useFindWorkflowByDocumentId } from "@/entities/workflows";
import { getContent } from "../shared";

export function useWorkflowPanel(documentId: string) {
    const { data: workflow } = useFindWorkflowByDocumentId(documentId);

    const { data: users } = useOrganizationUsers();

    const displayedParticipants = (workflow?.participants || []).map(participant => {
        const user = (users || []).find(u => u.id === participant.id);

        return {
            id: participant.id,
            displayName: getContent(user)!,
            status: participant.approvalStatus
        };
    });

    return { displayedParticipants };
}
