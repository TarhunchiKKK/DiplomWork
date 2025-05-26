import { useCurrentDocumentStore, useOneDocument } from "@/entities/documents";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function useDocumentPage() {
    const { id: documentId } = useParams() as { id: string };

    const { data: document } = useOneDocument(documentId);

    const versionId = useCurrentDocumentStore(state => state.versionId);

    const setVersionId = useCurrentDocumentStore(state => state.setVersionId);

    useEffect(() => {
        if (document) {
            setVersionId(document.lastVersionId);
        }
    }, [document, setVersionId]);

    return { documentId, versionId };
}
