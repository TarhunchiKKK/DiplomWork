import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { extractValidationMessages, TValidationError } from "@/shared/validation";
import { TRegisterDto, TRegisterResponse } from "./types";
import { credentialsManager, useProfileStore } from "@/features/auth";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/routing";

export function useRegister() {
    const setProfile = useProfileStore(state => state.setProfile);

    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TRegisterDto) => {
            const response = await axios.post<TRegisterResponse>(queryUrls.auth.registerAdmin, dto);
            return response.data;
        },
        onSuccess: response => {
            toast.success("Успешная регистрация");

            credentialsManager.jwt.set(response.token);

            setProfile(response);

            router.push(routes.dashboard.index);
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => {
                toast.error(message);
            });
        }
    });

    return {
        register: mutate,
        isPending
    };
}
