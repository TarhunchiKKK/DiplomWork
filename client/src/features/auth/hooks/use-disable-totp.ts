import { queryUrls, HttpHeadersBuilder, queryKeys } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { credentialsManager } from "../utils";

export function useDisableTotp() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const token = credentialsManager.jwt.get();

            await axios.patch(queryUrls.auth.totp.disable, null, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: () => {
            toast.success("Обновлено");

            queryClient.invalidateQueries({ queryKey: queryKeys.profile });
        },
        onError: httpErrorHandler
    });
}
