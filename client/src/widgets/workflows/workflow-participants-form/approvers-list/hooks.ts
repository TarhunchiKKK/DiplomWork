import { useOrganizationUsers } from "@/entities/users";
import { useParticipantsStore } from "../store";
import { getContent } from "../helpers";

export function useApproversList() {
    const { users } = useOrganizationUsers();

    const approvers = useParticipantsStore(state => state.approvers);

    const setApprovers = useParticipantsStore(state => state.setApprovers);

    const remove = (userId: string) => {
        setApprovers(approvers.filter(a => a.userId !== userId));
    };

    const displayedApprovers = approvers
        .filter(a => (users || []).find(u => u.id === a.userId))
        .map(a => {
            const user = users!.find(u => u.id === a.userId);
            return {
                ...a,
                displayName: getContent(user!) as string
            };
        });

    return {
        approvers: displayedApprovers,
        remove
    };
}
