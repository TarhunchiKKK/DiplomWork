import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { credentialsManager } from "@/features/auth";
import { toast } from "sonner";

export function useUsersInvitation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (emails: string[]) => {
            const token = credentialsManager.jwt.get();

            await axios.post<void>(queryUrls.users.invite, emails, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: () => {
            toast.success("Пользователи добавлены");

            queryClient.invalidateQueries({ queryKey: queryKeys.users.byOrganization });
        }
    });
}
