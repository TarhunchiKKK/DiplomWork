import { useCurrentVersionStore, useDocumentComments } from "@/entities/documents";

export function useCommentsList() {
    const versionId = useCurrentVersionStore(state => state.id) as string;

    return useDocumentComments(versionId);
}
