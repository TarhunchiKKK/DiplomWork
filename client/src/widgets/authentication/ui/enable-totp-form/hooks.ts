import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { queryUrls } from "@/shared/api";
import { TProfile, useProfileStore } from "@/features/auth";
import { redirect } from "next/navigation";
import { routes } from "@/shared/routing";
import { toast } from "sonner";
import { TValidationError, extractValidationMessages } from "@/shared/validation";

export function useEnableTotp() {
    const profile = useProfileStore(state => state.profile) as TProfile;

    const { mutate, isPending } = useMutation({
        mutationFn: async (pin: string) => {
            await axios.patch(queryUrls.auth.totp.enable, {
                userId: profile.id,
                userEmail: profile.email,
                secret: "",
                pin: pin
            });
        },
        onSuccess: () => {
            redirect(routes.settings.profile);
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
