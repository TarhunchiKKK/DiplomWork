import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { authCredentialsManager } from "@/features/auth";
import { toast } from "sonner";
import { useSet } from "@/shared/hooks";

export function useInviteUsersForm() {
    const emailsSet = useSet<string>();

    const form = useForm<TFormState>({
        defaultValues: {
            value: ""
        }
    });

    const onSubmit = form.handleSubmit((data: TFormState) => {
        emailsSet.add(data.value);
        form.reset();
    });

    return {
        emailsSet,
        form,
        onSubmit
    };
}

export function useUsersInvitation() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (emails: string[]) => {
            const token = authCredentialsManager.jwt.get();

            await axios.post<void>(queryUrls.users.invite, emails, {
                headers: new HttpHeadersBuilder().setBearerToken(token).get()
            });
        },
        onSuccess: () => {
            toast.success("Пользователи добавлены");

            queryClient.invalidateQueries({ queryKey: queryKeys.users.base });
        }
    });

    return {
        invite: mutate,
        isPending
    };
}
