import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TFullWorkflowResponse } from "../types";
import { transformFullWorkflow } from "../helpers";

export function useFindWorkflowByDocumentId(documentId: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: queryKeys.workflows.findOne.byDocumentId(documentId),
        queryFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.get<TFullWorkflowResponse>(
                queryUrls.workflows.findOneByDocumentId(documentId),
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );

            return response.data;
        },
        select: transformFullWorkflow
    });

    return {
        workflow: data,
        isLoading,
        error
    };
}
