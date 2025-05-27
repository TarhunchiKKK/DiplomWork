import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TFindWorkflowsResponse } from "../types";

export function useMyWorkflows() {
    return useQuery({
        queryKey: queryKeys.workflows.findAll.my,
        queryFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.get<TFindWorkflowsResponse>(queryUrls.workflows.findAll.my, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
            return response.data.workflows;
        }
    });
}
