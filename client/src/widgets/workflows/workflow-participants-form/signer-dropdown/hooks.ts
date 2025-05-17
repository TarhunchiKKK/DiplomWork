import { useParticipantsStore } from "../store";
import { getContent } from "../../shared/helpers";
import { useOrganizationUsers } from "@/entities/users";

export function useSignerDropdowm() {
    const { users } = useOrganizationUsers();

    const { approvers, setSignerId, signerId } = useParticipantsStore();

    const onSelect = (id: string) => {
        setSignerId(id);
    };

    const availableUsers = (users || [])
        .filter(user => !approvers.find(a => a.userId === user.id))
        .filter(user => user.id !== signerId);

    return {
        availableUsers,
        onSelect,
        buttonLabel: getContent((users || []).find(u => u.id === signerId)) ?? "Выбрать"
    };
}
