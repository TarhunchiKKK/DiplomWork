import { useDocument } from "@/widgets/document/hooks/use-document";
import { useOrganization } from "@/widgets/organization-settings";

export function useDocumentParams() {
    const { document, isLoading: isDocumentLoading } = useDocument();

    const { organization, isLoading: isOrganizationLoading } = useOrganization();

    const documentAim = organization?.documentAims.find(aim => aim._id === document?.aimId)?.value || null;

    const documentType = organization?.documentTypes.find(type => type._id === document?.typeId)?.value || null;

    return {
        documentAim,
        documentType,
        isLoading: isDocumentLoading || isOrganizationLoading
    };
}
