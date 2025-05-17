import { useCurrentVersionStore, useDocumentComments } from "@/entities/documents";

export function useCommentsList() {
    const versionId = useCurrentVersionStore(state => state.versionId) as string;

    return useDocumentComments(versionId);
}
