"use client";

import { useDocuments } from "@/entities/documents";
import {
    AddDocumentButton,
    DocumentsContainer,
    DocumentsCOntainerSkeleton,
    DocumentsDisplayTypeTabs
} from "@/widgets/documents-container";
import { Suspense } from "react";

export default function DashboardPage() {
    const { documents } = useDocuments();

    return (
        <div className="space-y-4">
            <div className="flex justify-between item-center">
                <AddDocumentButton />

                <DocumentsDisplayTypeTabs />
            </div>

            <Suspense fallback={<DocumentsCOntainerSkeleton />}>
                {documents && <DocumentsContainer documents={documents} />}
            </Suspense>
        </div>
    );
}
