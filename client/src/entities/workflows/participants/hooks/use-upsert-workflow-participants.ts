import { useMutation, useQueryClient } from "@tanstack/react-query";
import { credentialsManager } from "@/features/auth";
import axios from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";

type TParticipantDto = {
    id?: string;

    userId: string;
};

type TDto = {
    id: string;

    participants: TParticipantDto[];
};

export function useUpsertWorkflowParticipants() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            await axios.put(
                queryUrls.workflows.participants.upsert(dto.id),
                {
                    participants: dto.participants
                },
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.workflows.findOne.base });
        },
        onError: httpErrorHandler
    });
}
