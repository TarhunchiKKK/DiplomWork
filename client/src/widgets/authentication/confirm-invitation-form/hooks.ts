import { credentialsManager, useProfileStore } from "@/features/auth";
import { useMutation } from "@tanstack/react-query";
import { TConfirmInvitationFormState, TConfirmInvitationResponse } from "./types";
import axios, { AxiosError } from "axios";
import { queryUrls } from "@/shared/api";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export function useConfirmInvitation() {
    const setProfile = useProfileStore(state => state.setProfile);

    const { token } = useParams();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TConfirmInvitationFormState) => {
            const response = await axios.patch<TConfirmInvitationResponse>(queryUrls.auth.confirmInvitation, {
                ...dto,
                token
            });
            return response.data;
        },
        onSuccess: response => {
            toast.success("Успешная регистрация");

            credentialsManager.jwt.set(response.token);

            setProfile(response);
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => {
                toast.error(message);
            });
        }
    });

    return {
        confirmInvitation: mutate,
        isPending
    };
}
