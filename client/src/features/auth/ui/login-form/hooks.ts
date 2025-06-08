import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks";
import { TFormState, TProps } from "./types";
import { defaultValues } from "./constants";
import { useState } from "react";
import { toast } from "sonner";

export function useLoginForm(props: TProps) {
    const { mutate: login, isPending } = useLogin({ onSuccess: props.next });

    const form = useForm<TFormState>({
        defaultValues: defaultValues
    });

    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

    const onSubmit = form.handleSubmit((values: TFormState) => {
        if (!recaptchaValue) {
            toast.error("Пройдите капчу");
            return;
        }

        login(values);
    });

    return {
        form,
        onSubmit,
        isPending,
        setRecaptchaValue
    };
}
