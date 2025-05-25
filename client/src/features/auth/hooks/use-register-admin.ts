import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { httpErrorHandler } from "@/shared/validation";
import { credentialsManager, useProfileStore } from "@/features/auth";
import { TAuthResponse } from "../types";

type TDto = {
    username: string;

    email: string;

    password: string;
};

export function useRegisterAdmin() {
    const setProfile = useProfileStore(state => state.setProfile);

    return useMutation({
        mutationFn: async (dto: TDto) => {
            const response = await axios.post<TAuthResponse>(queryUrls.auth.registerAdmin, dto);
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
