"use client";

import { Input, Table, TableBody, TableCell, TableRow } from "@/shared/ui";
import { useApproversForm } from "./hooks";
import { getContent } from "../helpers";

export function ApproversForm() {
    const { availableUsers, input, onSelect, displayUsers } = useApproversForm();

    return (
        <div>
            <Input {...input} placeholder="Введите нового пользователя" />

            <Table className="relative">
                {displayUsers && (
                    <TableBody className="absolute top-0 left-0 w-full">
                        {availableUsers.map(user => (
                            <TableRow
                                key={user.id}
                                className="cursor-pointer"
                                onClick={onSelect.bind(null, { userId: user.id })}
                            >
                                <TableCell>{getContent(user)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
        </div>
    );
}

export function ApproversFormSkeleton() {
    return <></>;
}
