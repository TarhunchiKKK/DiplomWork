import { useCurrentDocumentStore, useOneDocument } from "@/entities/documents";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function useDocumentPage() {
    const { id: documentId } = useParams() as { id: string };

    const { data: document } = useOneDocument(documentId);

    const { versionId, setVersionId, resetVersionId } = useCurrentDocumentStore();

    useEffect(() => {
        if (document) {
            setVersionId(document.lastVersionId);
        }

        return () => {
            resetVersionId();
        };
    }, [document, setVersionId, resetVersionId]);

    return { documentId, versionId };
}
