import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type TDto = {
    workflowId: string;

    signerId: string;
};

export function useUpdateWorkflowSigner() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            await axios.patch(
                queryUrls.workflows.updateSigner(dto.workflowId),
                {
                    signerId: dto.signerId
                },
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.workflows.base });
        },
        onError: httpErrorHandler
    });
}
