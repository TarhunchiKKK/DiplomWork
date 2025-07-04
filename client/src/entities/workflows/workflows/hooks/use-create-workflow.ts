import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type TDto = {
    documentId: string;

    documentTitle: string;
};

export function useCreateWorkflow() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            await axios.post(queryUrls.workflows.create, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.workflows.findAll.my });
            queryClient.invalidateQueries({ queryKey: queryKeys.workflows.findOne.byDocumentId(variables.documentId) });
        },
        onError: httpErrorHandler
    });
}
