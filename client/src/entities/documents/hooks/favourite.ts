import { authCredentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TFindDocumentsResponse } from "../types";
import { transformDocumentShortData } from "../helpers";
import { toast } from "sonner";

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
export function useAddToFavourite() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (documentId: string) => {
            const token = authCredentialsManager.jwt.get();

            await axios.post(queryUrls.documents.favourite.add(documentId), {
                headers: new HttpHeadersBuilder().setBearerToken(token).get()
            });
        },
        onSuccess: (_, documentId) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.findOne(documentId) });
        },
        onError: () => toast.error("Ошибка")
    });

    return {
        add: mutate,
        isPending
    };
}

export function useRemoveFromFavourites() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (documentId: string) => {
            const token = authCredentialsManager.jwt.get();

            await axios.delete(queryUrls.documents.favourite.remove(documentId), {
                headers: new HttpHeadersBuilder().setBearerToken(token).get()
            });
        },
        onSuccess: (_, documentId) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.findOne(documentId) });
        },
        onError: () => toast.error("Ошибка")
    });

    return {
        remove: mutate,
        isPending
    };
}
