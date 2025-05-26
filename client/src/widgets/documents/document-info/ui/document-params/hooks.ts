import { useOneDocument } from "@/entities/documents";
import { useOrganization } from "@/entities/organizations";

export function useDocumentParams(documentId: string) {
    const { data: document } = useOneDocument(documentId);

    const { data: organization } = useOrganization();

    const documentAim = organization?.documentAims.find(aim => aim._id === document?.aimId)?.value || null;

    const documentType = organization?.documentTypes.find(type => type._id === document?.typeId)?.value || null;

    return {
        documentAim,
        documentType
    };
}
