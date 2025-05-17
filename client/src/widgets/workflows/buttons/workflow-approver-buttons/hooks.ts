import { ApprovalStatus, useFindWorkflowByDocumentId, useUpdatePArticipantStatus } from "@/entities/workflows";
import { TProfile, useProfileStore } from "@/features/auth";
import { useCurrentDocument } from "@/widgets/documents";

export function useApproverButtons() {
    const { documentId } = useCurrentDocument();

    const { workflow } = useFindWorkflowByDocumentId(documentId);

    const profile = useProfileStore(state => state.profile) as TProfile;

    const { isPending, updateStatus } = useUpdatePArticipantStatus();

    const onClick = (approvalStatus: ApprovalStatus) => {
        const participantId = workflow!.participants.find(p => p.id === profile.id)?.id as string;

        updateStatus({
            id: participantId,
            approvalStatus
        });
    };

    return { onClick, isPending };
}
