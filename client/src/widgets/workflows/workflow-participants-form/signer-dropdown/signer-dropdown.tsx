import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui";
import { useSignerDropdowm } from "./hooks";
import { getContent } from "../helpers";

export function SignerDropdown() {
    const { availableUsers, buttonLabel, onSelect } = useSignerDropdowm();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{buttonLabel}</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {availableUsers.map(user => (
                    <DropdownMenuItem key={user.id} onClick={onSelect.bind(null, user.id)}>
                        {getContent(user)}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
