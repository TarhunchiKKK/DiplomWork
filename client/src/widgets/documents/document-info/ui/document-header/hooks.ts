import { useOneUser } from "@/entities/users";
import { useCurrentDocument } from "@/widgets/documents";

export function useDocumentHeader() {
    const { document } = useCurrentDocument();

    const { data: user } = useOneUser(document?.authorId as string, !!document);

    return { document, user };
}
