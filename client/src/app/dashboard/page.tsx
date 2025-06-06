"use client";

import {
    DocumentsContainer,
    DocumentsContainerSkeleton,
    DocumentsDisplayTypeTabs
} from "@/widgets/documents-container";
import { Suspense } from "react";
import { useCurrentDocuments } from "./hooks";
import { CreateDocumentButton } from "@/widgets/documents";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Documents",
    description: "This page will allow you to manage documents."
};

export default function DashboardPage() {
    const { data: documents } = useCurrentDocuments();

    return (
        <div className="space-y-4">
            <div className="flex justify-between item-center">
                <CreateDocumentButton />

                <DocumentsDisplayTypeTabs />
            </div>

            <Suspense fallback={<DocumentsContainerSkeleton />}>
                {documents && <DocumentsContainer documents={documents} />}
            </Suspense>
        </div>
    );
}
