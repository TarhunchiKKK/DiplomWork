"use client";

import {
    DocumentsContainer,
    DocumentsCOntainerSkeleton,
    DocumentsDisplayTypeTabs
} from "@/widgets/documents-container";
import { Suspense } from "react";
import { CreateDocumentButton } from "@/widgets/documents";
import { mocks } from "@/dev";

export default function DashboardPage() {
    const documents = mocks.documentShortData;

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
