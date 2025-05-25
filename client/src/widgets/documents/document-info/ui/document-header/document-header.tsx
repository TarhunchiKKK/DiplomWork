"use client";

import { CardDescription, CardHeader, CardTitle, Skeleton } from "@/shared/ui";
import { useDocumentHeader } from "./hooks";
import { TProps } from "./types";

export function DocumentHeader({ documentId }: TProps) {
    const { document, user } = useDocumentHeader(documentId);

    return (
        <CardHeader>
            {document && <CardTitle>{document.title}</CardTitle>}

            {user && <CardDescription>{`Создатель: ${user.username ?? user.email}`}</CardDescription>}
        </CardHeader>
    );
}

export function DocumentHeaderSkeleton() {
    return (
        <CardHeader>
            <CardTitle>
                <Skeleton className="w-full h-6" />
            </CardTitle>

            <CardDescription>
                <Skeleton className="w-full h-6" />
            </CardDescription>
        </CardHeader>
    );
}
