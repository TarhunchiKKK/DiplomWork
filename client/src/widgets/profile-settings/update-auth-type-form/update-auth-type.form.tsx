"use client";

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui";
import { dropdownOptions } from "./constants";
import { useUpdateAuthType, useUpdateAuthTypeForm } from "./hooks";

export function UpdateAuthTypeForm() {
    const { buttonLabel, authType, setAuthType } = useUpdateAuthTypeForm();

    const { update, isPending } = useUpdateAuthType();

    return (
        <div className="flex justify-between items-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{buttonLabel}</Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    {dropdownOptions.map(option => (
                        <DropdownMenuItem key={option.value} onClick={setAuthType.bind(null, option.value)}>
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={update.bind(null, authType)} disabled={isPending}>
                Обновить
            </Button>
        </div>
    );
}
