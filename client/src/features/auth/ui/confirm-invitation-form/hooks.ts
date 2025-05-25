import { useForm } from "react-hook-form";
import { useConfirmInvitation } from "../../hooks";
import { TFormState } from "./types";
import { defaultValues } from "./constants";

export function useConfirmInvitationForm(invitationToken: string) {
    const { mutate: confirmInvitation, isPending } = useConfirmInvitation(invitationToken);

    const form = useForm<TFormState>({
        defaultValues: defaultValues
    });

    const onSubmit = form.handleSubmit((values: TFormState) => {
        confirmInvitation(values);
    });

    return { form, onSubmit, isPending };
}
