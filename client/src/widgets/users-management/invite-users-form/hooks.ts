import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { toast } from "sonner";
import { useSet } from "@/shared/hooks";
import { useOrganizationUsers } from "@/entities/users";

export function useInviteUsersForm() {
    const { data: users } = useOrganizationUsers();

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
