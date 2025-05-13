"use client";

import { Badge, Skeleton } from "@/shared/ui";
import { useDocumentParams } from "./hooks";

export function DocumentParams() {
    const { documentAim, documentType, isLoading } = useDocumentParams();

    return (
        <div className="flex flex-col items-start gap-2">
            {isLoading && (
                <>
                    <Skeleton className="w-28 h-6" />

                    <Skeleton className="w-28 h-6" />
                </>
            )}

            {!isLoading && (
                <>
                    {documentAim && <Badge variant="outline">{documentAim}</Badge>}

                    {documentType && <Badge variant="outline">{documentType}</Badge>}
                </>
            )}
        </div>
    );
}
