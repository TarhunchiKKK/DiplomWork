import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { credentialsManager } from "@/features/auth";
import { httpErrorHandler } from "@/shared/validation";

type TUpdateDocumentDto = {
    id: string;

    title?: string;

    typeId?: string;

    aimId?: string;

    isUrgent?: boolean;
};

export function useUpdateDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: TUpdateDocumentDto) => {
            const token = credentialsManager.jwt.get();

            await axios.patch(queryUrls.documents.update, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.findOne(variables.id) });
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.base });
        },
        onError: httpErrorHandler
    });
}
