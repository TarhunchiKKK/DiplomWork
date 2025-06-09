import { useForm } from "react-hook-form";
import { useEnableTotp } from "../../hooks";
import { TFormState, TProps } from "./types";
import { defaultValues } from "./constants";
import { useProfileStore } from "../../lib";
import { TProfile } from "../../types";
import { AuthType } from "@/entities/users";

export function useEnableTotpForm(props: TProps) {
    const { mutate: enableTotp, isPending } = useEnableTotp();

    const { profile, setProfile } = useProfileStore();

    const form = useForm<TFormState>({
        defaultValues: defaultValues
    });

    const onSubmit = form.handleSubmit((values: TFormState) => {
        enableTotp({
            ...values,
            secret: props.payload
        });

        setProfile({
            ...(profile as TProfile),
            authType: AuthType.TOTP
        });

        props.next();
    });

    return {
        form,
        onSubmit,
        isPending
    };
}
