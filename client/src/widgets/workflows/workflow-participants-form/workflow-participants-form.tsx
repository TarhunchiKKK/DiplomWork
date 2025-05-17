import { useForm } from "react-hook-form";
import { useSetup } from "./hooks";
import { TFormState } from "./types";

export function WorkflowParticipantsForm() {
    useSetup();

    const form = useForm<TFormState>({
        defaultValues: {
            value: ""
        }
    });

    return <></>;
}

export function WorkflowParticipantsFormSkeleton() {
    return <></>;
}
