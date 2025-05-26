import { useOrganization } from "@/entities/organizations";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui";
import { TProps } from "./types";
import { defaultLabel } from "./constants";

export function DocumentAimDropdown({ value, onChange }: TProps) {
    const { data: organization } = useOrganization();

    const documentAims = organization?.documentAims ?? [];

    const buttonLabel = documentAims.find(aim => aim._id === value)?.value ?? defaultLabel;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{buttonLabel}</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {documentAims.map(aim => (
                    <DropdownMenuItem key={aim._id} onClick={onChange.bind(null, aim._id)}>
                        {aim.value}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
