"use client";

import { CardDescription, CardHeader, CardTitle, Skeleton } from "@/shared/ui";
import { useDocumentHeader } from "./hooks";

export function DocumentHeader() {
    const { document, user } = useDocumentHeader();

    return (
        <CardHeader>
            {document && <CardTitle>{document.title}</CardTitle>}

            {!document && <Skeleton className="w-[130px] h-6" />}

            {user === undefined && <Skeleton className="w-[130px] h-6" />}

            {user && <CardDescription>{`Создатель: ${user.username ?? user.email}`}</CardDescription>}
        </CardHeader>
    );
}
