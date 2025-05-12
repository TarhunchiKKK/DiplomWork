import { useSearchParams } from "next/navigation";
import { TFindDocumentsResponse, TQueryParams } from "../types";
import { useQuery } from "@tanstack/react-query";
import { createQueryKey, transformDocumentShortData } from "../helpers";
import axios from "axios";
import { HttpHeadersBuilder, queryUrls } from "@/shared/api";
import { authCredentialsManager } from "@/features/auth";

export function useDocuments() {
    const searchParams = useSearchParams();

    const queryParams: TQueryParams = {
        aimId: searchParams.get("aimId") || undefined,
        typeId: searchParams.get("typeId") || undefined,
        isUrgent: Boolean(searchParams.get("isUrgent")) || undefined
    };

    const { data, isLoading } = useQuery({
        queryKey: createQueryKey(queryParams),
        queryFn: async () => {
            const token = authCredentialsManager.jwt.get();

            const response = await axios.get<TFindDocumentsResponse>(queryUrls.documents.findAll, {
                headers: new HttpHeadersBuilder().setBearerToken(token).get(),
                params: queryParams
            });
            return response.data.documents;
        },
        select: documents => documents.map(transformDocumentShortData)
    });

    return { documents: data, isLoading };
}
