import { useForm } from "react-hook-form";
import { useEnableTotp } from "../../hooks";
import { TFormState, TProps } from "./types";
import { defaultValues } from "./constants";

export function useEnableTotpForm(props: TProps) {
    const { mutate: enableTotp, isPending } = useEnableTotp();

    const form = useForm<TFormState>({
        defaultValues: defaultValues
    });

    const onSubmit = form.handleSubmit((values: TFormState) => {
        enableTotp({
            ...values,
            secret: props.payload
        });
    });

    return {
        form,
        onSubmit,
        isPending
    };
}
