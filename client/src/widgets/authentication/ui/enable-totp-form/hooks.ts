import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { queryUrls } from "@/shared/api";
import { TProfile, useProfileStore } from "@/features/auth";
import { toast } from "sonner";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { TProps } from "./types";

export function useEnableTotp(props: TProps) {
    const profile = useProfileStore(state => state.profile) as TProfile;

    const { mutate, isPending } = useMutation({
        mutationFn: async (pin: string) => {
            await axios.patch(queryUrls.auth.totp.enable, {
                userId: profile.id,
                userEmail: profile.email,
                secret: props.payload,
                pin: pin
            });
        },
        onSuccess: () => {
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
