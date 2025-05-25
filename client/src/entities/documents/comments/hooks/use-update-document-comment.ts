import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type TDto = {
    id: string;

    message: string;

    versionId: string;
};

export function useUpdateDocumentCommet() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            await axios.patch(
                queryUrls.documents.comments.update(dto.id),
                {
                    id: dto.id,
                    message: dto.message
                },
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.comments.findAll(variables.versionId) });
        },
        onError: httpErrorHandler
    });

    return {
        updateComment: mutate,
        isPending
    };
}
