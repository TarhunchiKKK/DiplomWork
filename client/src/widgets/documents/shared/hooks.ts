"use client";

import { useOneDocument } from "@/entities/documents";
import { useParams } from "next/navigation";

export function useCurrentDocument() {
    const { id: documentId } = useParams() as { id: string };

    const { document, isLoading } = useOneDocument(documentId);

    return {
        documentId,
        document,
        isLoading
    };
}
