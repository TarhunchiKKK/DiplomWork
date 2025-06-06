import { useFavouriteDocuments } from "@/entities/documents";
import {
    DocumentsContainer,
    DocumentsContainerSkeleton,
    DocumentsDisplayTypeTabs
} from "@/widgets/documents-container";
import { Suspense } from "react";
import { Metadata } from "next";
import { EmptyListMessage } from "@/shared/ui";

export const metadata: Metadata = {
    title: "Favourite Documents",
    description: "On this page you can see your favourite documents."
};

export default function FavouriteocumentsPage() {
    "use client";

    const { data: documents } = useFavouriteDocuments();

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <DocumentsDisplayTypeTabs />
            </div>

            <Suspense fallback={<DocumentsContainerSkeleton />}>
                {documents && <DocumentsContainer documents={documents} />}

                <EmptyListMessage items={documents} message="У вас нет избранных документов" />
            </Suspense>
        </div>
    );
}
