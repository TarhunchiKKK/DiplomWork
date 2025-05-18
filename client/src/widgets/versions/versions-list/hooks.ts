import { mocks } from "@/dev";
import { useCurrentDocumentStore, useDocumentVersions } from "@/entities/documents";
import { useParams } from "next/navigation";

export function useVersionsList() {
    const { id: documentId } = useParams() as { id: string };

    // const { versions } = useDocumentVersions(documentId);

    const versions = mocks.versions;

    const setCurrentVersionId = useCurrentDocumentStore(state => state.setVersionId);

    return {
        versions,
        onClick: setCurrentVersionId
    };
}
