import { useCurrentDocumentStore, useDocumentComments } from "@/entities/documents";

export function useCommentsList() {
    const versionId = useCurrentDocumentStore(state => state.versionId) as string;

    return useDocumentComments(versionId);
}
