import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useStartWorkflow() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (workflowId: string) => {
            const token = credentialsManager.jwt.get();

            await axios.post(queryUrls.workflows.start(workflowId), undefined, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.workflows.base });
        },
        onError: httpErrorHandler
    });
}
