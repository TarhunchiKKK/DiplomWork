import { useMultipleUsers } from "@/entities/users";
import { useDocument } from "@/widgets/document/hooks/use-document";

export function useDocumentHeader() {
    const { document } = useDocument();

    const { users } = useMultipleUsers({
        ids: [document?.authorId || ""],
        enabled: !!document
    });

    const user = users ? users[0] : null;

    return { document, user };
}
