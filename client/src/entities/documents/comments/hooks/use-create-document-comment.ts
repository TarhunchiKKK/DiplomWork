import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type TDto = {
    message: string;

    versionId: string;
};

export function useCreateDocumentComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            await axios.post(queryUrls.documents.comments.create, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.comments.findAll(variables.versionId) });
        },
        onError: httpErrorHandler
    });
}
