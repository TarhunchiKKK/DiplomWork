import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApprovalStatus } from "../enums";
import { credentialsManager } from "@/features/auth";
import axios from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";

type TDto = {
    id: string;

    approvalStatus: ApprovalStatus;
};

export function useUpdatePArticipantStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            await axios.patch(
                queryUrls.workflows.participants.uspateStatus(dto.id),
                {
                    approvalStatus: dto.approvalStatus
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
