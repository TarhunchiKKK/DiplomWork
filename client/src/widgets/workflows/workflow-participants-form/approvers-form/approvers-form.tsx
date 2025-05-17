"use client";

import { Input } from "@/shared/ui";
import { useApproversForm } from "./hooks";
import { getContent } from "../helpers";

export function ApproversForm() {
    const { availableUsers, input, onSelect, displayUsers } = useApproversForm();

    return (
        <div>
            <Input {...input} placeholder="Введите нового пользователя" />

            <div className="relative">
                {displayUsers && (
                    <div className="absolute top-0 left-0 w-full z-50 rounded-sm border bg-background">
                        {availableUsers.map(user => (
                            <div
                                key={user.id}
                                className="cursor-pointer w-full border-b px-4 py-1 last:border-none hover:bg-accent"
                                onClick={onSelect.bind(null, { userId: user.id })}
                            >
                                {getContent(user)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export function ApproversFormSkeleton() {
    return <Input placeholder="Введите нового пользователя" />;
}
