import { TFormState, TProps } from "./types";
import { useForm } from "react-hook-form";
import { defaultValues } from "./constants";
import { useTotpLogin } from "../../hooks";

export function useTotpLoginForm(props: TProps) {
    const { mutate: login, isPending } = useTotpLogin(props.next);

    const form = useForm<TFormState>({
        defaultValues: defaultValues
    });

    const onSubmit = form.handleSubmit((values: TFormState) => {
        login({
            ...props.payload,
            ...values
        });
    });

    return {
        form,
        onSubmit,
        isPending
    };
}
