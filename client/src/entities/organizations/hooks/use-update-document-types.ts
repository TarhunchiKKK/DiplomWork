import { credentialsManager } from "@/features/auth";
import { queryUrls, HttpHeadersBuilder, queryKeys } from "@/shared/api";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

type TUpdateDto = {
    organizationId: string;

    documentTypes: { _id?: string; value: string }[];
};

export function useUpdateDocumentTypes() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TUpdateDto) => {
            const token = credentialsManager.jwt.get();

            await axios.patch(queryUrls.organizations.updateDocumentTypes, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.organizations.findOne });
        },
        onSuccess: () => {
            toast.success("Обновлено успешно");
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => {
                toast.error(message);
            });
        }
    });

    return {
        updateDocumentTypes: mutate,
        isPending
    };
}
