import { useOneDocument } from "@/entities/documents";
import { useOneUser } from "@/entities/users";

export function useDocumentHeader(documentId: string) {
    const { data: document } = useOneDocument(documentId);

    const { data: user } = useOneUser(document?.authorId as string, !!document);

    return { document, user };
}
