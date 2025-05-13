import { useSearchParams } from "next/navigation";
import { TFindDocumentsResponse, TQueryParams } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createQueryKey, transformDocumentShortData } from "../helpers";
import axios from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { authCredentialsManager } from "@/features/auth";
import { TUpdateDocumentDto } from "../types/api";
import { toast } from "sonner";

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

export function useUpdateDocument(documentId: string) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TUpdateDocumentDto) => {
            const token = authCredentialsManager.jwt.get();

            await axios.patch(queryUrls.documents.update, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(token).get()
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.findOne(documentId) });
        },
        onError: () => toast.error("Ошибка")
    });

    return { update: mutate, isPending };
}
