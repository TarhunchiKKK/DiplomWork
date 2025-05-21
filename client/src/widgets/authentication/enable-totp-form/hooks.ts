import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { credentialsManager, TProfile, useProfileStore } from "@/features/auth";
import { toast } from "sonner";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { TProps } from "./types";

export function useEnableTotp(props: TProps) {
    const profile = useProfileStore(state => state.profile) as TProfile;

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (pin: string) => {
            const token = credentialsManager.jwt.get();

            await axios.patch(
                queryUrls.auth.totp.enable,
                {
                    userId: profile.id,
                    userEmail: profile.email,
                    secret: props.payload,
                    pin: pin
                },
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.profile });

            props.next();
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => toast.error(message));
        }
    });

    return {
        enable: mutate,
        isPending
    };
}
