import { useMultipleUsers } from "@/entities/users";
import { useCurrentDocument } from "@/widgets/document/shared";

export function useDocumentHeader() {
    const { document } = useCurrentDocument();

    const { users } = useMultipleUsers({
        ids: [document?.authorId || ""],
        enabled: !!document
    });

    const user = users ? users[0] : null;

    return { document, user };
}
