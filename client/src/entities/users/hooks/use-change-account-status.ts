import { AccountStatus } from "@/entities/users";
import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type TDto = {
    userId: string;

    status: AccountStatus;
};

export function useChangeAccountStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            await axios.patch<void>(
                queryUrls.users.changeStatus(dto.userId),
                { status: dto.status },
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.byOrganization });
        },
        onError: () => {
            toast.error("Ошибка");
        }
    });
}
