import { authCredentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TFindDocumentsResponse } from "../types";
import { transformDocumentShortData } from "../helpers";

export function useFavouriteDocuments() {
    const token = authCredentialsManager.jwt.get() as string;

    const { data, isLoading } = useQuery({
        queryKey: queryKeys.documents.favourite,
        queryFn: async () => {
            const response = await axios.get<TFindDocumentsResponse>(queryUrls.documents.favourite.findAll, {
                headers: new HttpHeadersBuilder().setBearerToken(token).get()
            });
            return response.data.documents;
        },
        select: documents => documents.map(transformDocumentShortData)
    });

    return {
        documents: data,
        isLoading
    };
}
