import { credentialsManager } from "@/features/auth";
import { queryKeys, queryUrls, HttpHeadersBuilder } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TDocument } from "../models";

export function useOneDocument(documentId: string) {
    const { data, isLoading } = useQuery({
        queryKey: queryKeys.documents.findOne(documentId),
        queryFn: async () => {
            const token = credentialsManager.jwt.get() as string;

            const response = await axios.get<TDocument>(queryUrls.documents.findOne(documentId), {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });

            return response.data;
        }
    });

    return { document: data, isLoading };
}
