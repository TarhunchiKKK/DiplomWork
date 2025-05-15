import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useAddToFavourite() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (documentId: string) => {
            const token = credentialsManager.jwt.get();

            await axios.post(queryUrls.documents.favourite.add(documentId), {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: (_, documentId) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.documents.findOne(documentId) });
        },
        onError: () => toast.error("Ошибка")
    });

    return {
        add: mutate,
        isPending
    };
}
