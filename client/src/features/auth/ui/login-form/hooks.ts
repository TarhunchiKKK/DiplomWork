import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks";
import { TFormState, TProps } from "./types";
import { defaultValues } from "./constants";

export function useLoginForm(props: TProps) {
    const { mutate: login, isPending } = useLogin(props.next);

    const form = useForm<TFormState>({
        defaultValues: defaultValues
    });

    const onSubmit = form.handleSubmit((values: TFormState) => {
        login(values);
    });

    return {
        form,
        onSubmit,
        isPending
    };
}
