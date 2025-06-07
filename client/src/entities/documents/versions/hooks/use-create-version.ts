import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type TDto = {
    documentId: string;

    s3Name: string;

    description?: string;

    hash: string;
};

export function useCreateDocumentVersion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            await axios.post(queryUrls.documents.versions.create, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: (_, dto) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.versions.findAll(dto.documentId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.versions.findLast(dto.documentId) });
        },
        onError: httpErrorHandler
    });
}
