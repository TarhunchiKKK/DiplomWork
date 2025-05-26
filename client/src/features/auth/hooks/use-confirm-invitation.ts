import { credentialsManager, useProfileStore } from "@/features/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryUrls } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";
import { toast } from "sonner";
import { TAuthResponse } from "../types";

type TDto = {
    username: string;

    password: string;
};

export function useConfirmInvitation(invitationToken: string) {
    const setProfile = useProfileStore(state => state.setProfile);

    return useMutation({
        mutationFn: async (dto: TDto) => {
            const response = await axios.patch<TAuthResponse>(queryUrls.auth.confirmInvitation, {
                ...dto,
                token: invitationToken
            });
            return response.data;
        },
        onSuccess: response => {
            toast.success("Успешная регистрация");

            credentialsManager.jwt.set(response.token);

            setProfile(response);
        },
        onError: httpErrorHandler
    });
}
