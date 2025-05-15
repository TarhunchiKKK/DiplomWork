"use client";

import { Badge, Skeleton } from "@/shared/ui";
import { useDocumentParams } from "./hooks";

export function DocumentParams() {
    const { documentAim, documentType } = useDocumentParams();

    return (
        <div className="flex flex-col items-start gap-2">
            {documentAim && <Badge variant="outline">{documentAim}</Badge>}

            {documentType && <Badge variant="outline">{documentType}</Badge>}
        </div>
    );
}

export function DocumentParamsSkeleton() {
    return (
        <div className="flex flex-col items-start gap-2">
            <Skeleton className="w-2/3 h-6" />

            <Skeleton className="w-2/3 h-6" />
        </div>
    );
}
