"use client";

import {
    DocumentsContainer,
    DocumentsCOntainerSkeleton,
    DocumentsDisplayTypeTabs
} from "@/widgets/documents-container";
import { Suspense } from "react";
import { useCurrentDocuments } from "./hooks";
import { CreateDocumentButton } from "@/widgets/documents";

export default function DashboardPage() {
    const { documents } = useCurrentDocuments();

    return (
        <div className="space-y-4">
            <div className="flex justify-between item-center">
                <CreateDocumentButton />

                <DocumentsDisplayTypeTabs />
            </div>

            <Suspense fallback={<DocumentsCOntainerSkeleton />}>
                {documents && <DocumentsContainer documents={documents} />}
            </Suspense>
        </div>
    );
}
