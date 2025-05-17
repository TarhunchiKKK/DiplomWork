import { useOrganizationUsers } from "@/entities/users";
import { useFindWorkflowByDocumentId } from "@/entities/workflows";
import { useCurrentDocument } from "@/widgets/documents";
import { getContent } from "../shared";

export function useWorkflowPanel() {
    const { documentId } = useCurrentDocument();

    const { workflow } = useFindWorkflowByDocumentId(documentId);

    const { users } = useOrganizationUsers();

    const displayedParticipants = (workflow?.participants || []).map(participant => {
        const user = (users || []).find(u => u.id === participant.id);

        return {
            id: participant.id,
            displayName: getContent(user)!,
            status: participant.approval.status
        };
    });

    return { displayedParticipants };
}
