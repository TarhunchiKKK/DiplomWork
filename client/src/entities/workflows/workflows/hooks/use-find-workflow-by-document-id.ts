import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TFullWorkflow } from "../models";

export function useFindWorkflowByDocumentId(documentId: string) {
    return useQuery({
        queryKey: queryKeys.workflows.findOne.byDocumentId(documentId),
        queryFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.get<TFullWorkflow>(queryUrls.workflows.findOne.byDocumentId(documentId), {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });

            return response.data;
        },
        retry: 1
    });
}
