import { useForm } from "react-hook-form";
import { useConfirmInvitation } from "../../hooks";
import { TFormState } from "./types";
import { defaultValues } from "./constants";
import { useState } from "react";
import { toast } from "sonner";

export function useConfirmInvitationForm(invitationToken: string) {
    const { mutate: confirmInvitation, isPending } = useConfirmInvitation(invitationToken);

    const form = useForm<TFormState>({
        defaultValues: defaultValues
    });

    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

    const onSubmit = form.handleSubmit((values: TFormState) => {
        if (!recaptchaValue) {
            toast.error("Пройдите капчу");
            return;
        }

        confirmInvitation(values);
    });

    return { form, onSubmit, isPending, setRecaptchaValue };
}
