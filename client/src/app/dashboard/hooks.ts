import { useDocuments } from "@/entities/documents";
import { useSearchParams } from "next/navigation";

export function useCurrentDocuments() {
    const searchParams = useSearchParams();

    const queryParams = {
        aimId: searchParams.get("aimId") || undefined,
        typeId: searchParams.get("typeId") || undefined,
        isUrgent: Boolean(searchParams.get("isUrgent")) || undefined
    };

    return useDocuments(queryParams);
}
