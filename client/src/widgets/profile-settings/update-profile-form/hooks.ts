import { credentialsManager, useProfileStore } from "@/features/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TUpdateProfileFormState } from "./types";
import axios, { AxiosError } from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { useForm } from "react-hook-form";

export function useUpdateProfileForm() {
    const profile = useProfileStore(state => state.profile);

    const form = useForm<TUpdateProfileFormState>({
        defaultValues: {
            username: profile?.username || ""
        }
    });

    return form;
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TUpdateProfileFormState) => {
            const token = credentialsManager.jwt.get();

            await axios.patch(queryUrls.users.updateProfile, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: () => {
            toast.success("Профиль обновлен");

            queryClient.invalidateQueries({ queryKey: queryKeys.profile });
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => toast.error(message));
        }
    });

    return {
        update: mutate,
        isPending
    };
}
