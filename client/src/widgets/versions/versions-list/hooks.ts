import { useCurrentDocumentStore, useDocumentVersions } from "@/entities/documents";
import { useParams } from "next/navigation";

export function useVersionsList() {
    const { id: documentId } = useParams() as { id: string };

    const { versions } = useDocumentVersions(documentId);

    const setCurrentVersionId = useCurrentDocumentStore(state => state.setVersionId);

    return {
        versions,
        onClick: setCurrentVersionId
    };
}
