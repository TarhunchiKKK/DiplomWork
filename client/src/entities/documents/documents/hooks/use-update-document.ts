import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { credentialsManager } from "@/features/auth";
import { toast } from "sonner";

type TUpdateDocumentDto = {
    id: string;

    title?: string;

    typeId?: string;

    aimId?: string;

    isUrgent?: boolean;
};

export function useUpdateDocument() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TUpdateDocumentDto) => {
            const token = credentialsManager.jwt.get();

            await axios.patch(queryUrls.documents.update, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.findOne(variables.id) });
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.base });
        },
        onError: () => toast.error("Ошибка")
    });

    return { update: mutate, isPending };
}
