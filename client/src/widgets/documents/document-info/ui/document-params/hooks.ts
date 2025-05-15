import { useOrganization } from "@/entities/organizations";
import { useCurrentDocument } from "@/widgets/documents";

export function useDocumentParams() {
    const { document } = useCurrentDocument();

    const { organization } = useOrganization();

    const documentAim = organization?.documentAims.find(aim => aim._id === document?.aimId)?.value || null;

    const documentType = organization?.documentTypes.find(type => type._id === document?.typeId)?.value || null;

    return {
        documentAim,
        documentType
    };
}
