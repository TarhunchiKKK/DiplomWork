import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { credentialsManager } from "@/features/auth";
import { TFindDocumentsResponse, transformDocumentShortData } from "../../shared";

type TQueryParams = {
    typeId?: string;

    aimId?: string;

    isUrgent?: boolean;
};

export function useDocuments(queryParams: TQueryParams) {
    return useQuery({
        queryKey: queryKeys.documents.findAll(queryParams),
        queryFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.get<TFindDocumentsResponse>(queryUrls.documents.findAll, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build(),
                params: queryParams
            });
            return response.data.documents ?? [];
        },
        select: documents => documents.map(transformDocumentShortData)
    });
}
