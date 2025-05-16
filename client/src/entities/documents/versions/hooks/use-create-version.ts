import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

type TDto = {
    documentId: string;

    filename: string;

    description?: string;

    hash: string;
};

export function useCreateDocumentVersion() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            await axios.post(queryUrls.documents.versions.create, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: (_, dto) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.versions.findAll(dto.documentId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.versions.findLast(dto.documentId) });
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => toast.error(message));
        }
    });

    return {
        create: mutate,
        isPending
    };
}
