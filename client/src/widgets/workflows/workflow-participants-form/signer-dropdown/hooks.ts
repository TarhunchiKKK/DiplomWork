import { mocks } from "@/dev";
import { useParticipantsStore } from "../store";
import { getContent } from "../helpers";

export function useSignerDropdowm() {
    // const { users } = useOrganizationUsers();

    const users = mocks.users;

    const { approvers, setSignerId, signerId } = useParticipantsStore();

    const onSelect = (id: string) => {
        setSignerId(id);
    };

    const availableUsers = users
        .filter(user => !approvers.find(a => a.userId === user.id))
        .filter(user => user.id !== signerId);

    return {
        availableUsers,
        onSelect,
        buttonLabel: getContent(users.find(u => u.id === signerId)) ?? "Выбрать"
    };
}
