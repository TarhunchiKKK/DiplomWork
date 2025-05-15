import { useCurrentVersionStore, useDocumentVersions } from "@/entities/documents";
import { useParams } from "next/navigation";

export function useVersionsList() {
    const { id: documentId } = useParams() as { id: string };

    const { versions } = useDocumentVersions(documentId);

    const setCurrentVersion = useCurrentVersionStore(state => state.setCurrentVersion);

    return {
        versions,
        onClick: setCurrentVersion
    };
}
