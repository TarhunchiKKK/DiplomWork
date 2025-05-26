import { useOrganization } from "@/entities/organizations";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui";
import { TProps } from "./types";
import { defaultLabel } from "./constants";

export function DocumentTypeDropdown({ value, onChange }: TProps) {
    const { data: organization } = useOrganization();

    const documentTypes = organization?.documentTypes ?? [];

    const buttonLabel = documentTypes.find(type => type._id === value)?.value ?? defaultLabel;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{buttonLabel}</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {documentTypes.map(type => (
                    <DropdownMenuItem key={type._id} onClick={onChange.bind(null, type._id)}>
                        {type.value}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
