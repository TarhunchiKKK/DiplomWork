"use client";

import { Input, Table, TableBody, TableCell, TableRow } from "@/shared/ui";
import { useApproversForm } from "./hooks";
import { getContent } from "./helpers";

export function ApproversForm() {
    const { availableUsers, input, onSelect, displayUsers } = useApproversForm();

    return (
        <div>
            <Input {...input} placeholder="Введите нового пользователя" />

            <Table>
                {displayUsers && (
                    <TableBody>
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
