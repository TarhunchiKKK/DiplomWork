import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { credentialsManager } from "@/features/auth";
import { toast } from "sonner";
import { useSet } from "@/shared/hooks";
import { useOrganizationUsers } from "@/entities/users";

export function useInviteUsersForm() {
    const { users } = useOrganizationUsers();

    const emailsSet = useSet<string>();

    const form = useForm<TFormState>({
        defaultValues: {
            value: ""
        }
    });

    const onSubmit = form.handleSubmit((data: TFormState) => {
        if (users?.find(user => user.email === data.value)) {
            toast.warning("Этот пользователь уже приглашен");
        } else {
            emailsSet.add(data.value);
        }
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
            const token = credentialsManager.jwt.get();

            await axios.post<void>(queryUrls.users.invite, emails, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSuccess: () => {
            toast.success("Пользователи добавлены");

            queryClient.invalidateQueries({ queryKey: queryKeys.users.byOrganization });
        }
    });

    return {
        invite: mutate,
        isPending
    };
}
