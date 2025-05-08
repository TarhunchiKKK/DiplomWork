import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { TUpdatePasswordFormState } from "./types";
import axios, { AxiosError } from "axios";
import { queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { TValidationError, extractValidationMessages } from "@/shared/validation";

export function useUpdatePassword() {
    const { token } = useParams();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TUpdatePasswordFormState) => {
            await axios.patch<void>(queryUrls.passwordRecovery.update, {
                ...dto,
                token
            });
        },
        onSuccess: () => {
            toast.success("Пароль обновлен");
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => {
                toast.error(message);
            });
        }
    });

    return { update: mutate, isPending };
}
