import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TFindWorkflowsResponse } from "../types";

export function useWorkflowsByParticipation() {
    return useQuery({
        queryKey: queryKeys.workflows.findAll.byParticipation,
        queryFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.get<TFindWorkflowsResponse>(queryUrls.workflows.findAll.byParticipation, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
            return response.data.workflows || [];
        }
    });
}
