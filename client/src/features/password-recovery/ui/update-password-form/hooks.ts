import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../../hooks";
import { defaultValues } from "./constants";
import { TFormState } from "./types";

export function useUpdatePasswordForm(recoveryToken: string) {
    const { update, isPending } = useUpdatePassword();

    const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

    const form = useForm<TFormState>({
        defaultValues: defaultValues
    });

    const onSubmit = form.handleSubmit((values: TFormState) => {
        update({
            ...values,
            token: recoveryToken
        });
        setIsPasswordUpdated(true);
    });

    return {
        form,
        onSubmit,
        isPending,
        isPasswordUpdated
    };
}
