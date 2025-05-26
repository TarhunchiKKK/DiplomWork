import { ApprovalStatus, useFindWorkflowByDocumentId, useUpdatePArticipantStatus } from "@/entities/workflows";
import { TProfile, useProfileStore } from "@/features/auth";

export function useApproverButtons(documentId: string) {
    const { data: workflow } = useFindWorkflowByDocumentId(documentId);

    const profile = useProfileStore(state => state.profile) as TProfile;

    const { mutate: updateStatus, isPending } = useUpdatePArticipantStatus();

    const onClick = (approvalStatus: ApprovalStatus) => {
        const participantId = workflow!.participants.find(p => p.id === profile.id)?.id as string;

        updateStatus({
            id: participantId,
            approvalStatus
        });
    };

    return { onClick, isPending };
}
