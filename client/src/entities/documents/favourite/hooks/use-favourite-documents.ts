import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TFindDocumentsResponse, transformDocumentShortData } from "../../shared";

export function useFavouriteDocuments() {
    const { data, isLoading } = useQuery({
        queryKey: queryKeys.documents.favourite,
        queryFn: async () => {
            const token = credentialsManager.jwt.get() as string;

            const response = await axios.get<TFindDocumentsResponse>(queryUrls.documents.favourite.findAll, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
            return response.data.documents ?? [];
        },
        select: documents => documents.map(transformDocumentShortData)
    });

    return {
        documents: data,
        isLoading
    };
}
