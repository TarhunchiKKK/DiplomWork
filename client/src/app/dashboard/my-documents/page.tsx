"use client";

import { useMyDocuments } from "@/entities/documents";
import {
    DocumentsContainer,
    DocumentsContainerSkeleton,
    DocumentsDisplayTypeTabs
} from "@/widgets/documents-container";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your Documents",
    description: "On this page you can see your own documents."
};

export default function MyDocumentsPage() {
    const { data: documents } = useMyDocuments();

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
