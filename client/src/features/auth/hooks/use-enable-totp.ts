import { queryUrls, HttpHeadersBuilder, queryKeys } from "@/shared/api";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useProfileStore } from "../lib";
import { TProfile } from "../types";
import { credentialsManager } from "../utils";

type TDto = {
    secret: string;

    pin: string;
};

export function useEnableTotp() {
    const profile = useProfileStore(state => state.profile) as TProfile;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            await axios.patch(
                queryUrls.auth.totp.enable,
                {
                    ...dto,
                    userId: profile.id,
                    userEmail: profile.email
                },
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.profile });
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => toast.error(message));
        }
    });
}
