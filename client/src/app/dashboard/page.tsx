"use client";

import {
    AddDocumentButton,
    DocumentsContainer,
    DocumentsCOntainerSkeleton,
    DocumentsDisplayTypeTabs
} from "@/widgets/documents-container";
import { Suspense } from "react";
import { useCurrentDocuments } from "./hooks";

export default function DashboardPage() {
    const { documents } = useCurrentDocuments();

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
