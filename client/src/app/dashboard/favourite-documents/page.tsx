"use client";

import { useFavouriteDocuments } from "@/entities/documents";
import {
    DocumentsContainer,
    DocumentsContainerSkeleton,
    DocumentsDisplayTypeTabs
} from "@/widgets/documents-container";
import { Suspense } from "react";

export default function FavouriteocumentsPage() {
    const { data: documents } = useFavouriteDocuments();

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <DocumentsDisplayTypeTabs />
            </div>

            <Suspense fallback={<DocumentsContainerSkeleton />}>
                {documents && <DocumentsContainer documents={documents} />}
            </Suspense>
        </div>
    );
}
