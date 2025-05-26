import { TParticipantDto } from "../types";
import { useParticipantsStore } from "../store";
import { ChangeEvent, useState } from "react";
import { getContent } from "../../shared/helpers";
import { useOrganizationUsers } from "@/entities/users";

export function useApproversForm() {
    const { data: users } = useOrganizationUsers();

    const [input, setInput] = useState("");
    const [displayUsers, setDisplayUsers] = useState(false);

    const { approvers, signerId, setApprovers } = useParticipantsStore();

    const onSelect = (dto: TParticipantDto) => {
        setInput("");
        setApprovers([...approvers, dto]);
    };

    const availableUsers = (users || [])
        .filter(user => getContent(user)!.toLowerCase().includes(input))
        .filter(user => user.id !== signerId)
        .filter(user => !approvers.find(a => a.userId === user.id));

    return {
        input: {
            value: input,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                setDisplayUsers(true);
                setInput(e.target.value);
            },
            onClick: () => setDisplayUsers(prev => !prev)
        },
        availableUsers,
        displayUsers,
        onSelect
    };
}
