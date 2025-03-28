import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TUpdateDto } from "./types";
import { authCredentialsManager } from "@/features/auth";
import axios, { AxiosError } from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { TValidationError, extractValidationMessages } from "@/shared/validation";

export function useUpdate() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TUpdateDto) => {
            const jwtToken = authCredentialsManager.jwt.get();

            await axios.patch(queryUrls.organizations.updateAdministrativeDivisions, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(jwtToken).get()
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.organizations.base });
        },
        onSuccess: () => {
            toast.success("Обновлено успешно");
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => {
                toast.error(message);
            });
        }
    });

    return {
        update: mutate,
        isPending
    };
}
