"use client";

import {
    DocumentsContainer,
    DocumentsContainerSkeleton,
    DocumentsDisplayTypeTabs
} from "@/widgets/documents-container";
import { Suspense } from "react";
import { CreateDocumentButton } from "@/widgets/documents";
import { useDocuments } from "@/entities/documents";
import { useSearchParams } from "next/navigation";
import { EmptyListMessage } from "@/shared/ui";

export default function DashboardPage() {
    const searchParams = useSearchParams();

    const queryParams = {
        aimId: searchParams.get("aimId") || undefined,
        typeId: searchParams.get("typeId") || undefined,
        isUrgent: Boolean(searchParams.get("isUrgent")) || undefined
    };

    const { data: documents } = useDocuments(queryParams);

    return (
        <div className="space-y-4">
            <div className="flex justify-between item-center">
                <CreateDocumentButton />

                <DocumentsDisplayTypeTabs />
            </div>

            <Suspense fallback={<DocumentsContainerSkeleton />}>
                {documents && <DocumentsContainer documents={documents} />}

                <EmptyListMessage items={documents} message="Нет документов" />
            </Suspense>
        </div>
    );
}
