import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { useCreateDocumentComment } from "@/entities/documents";

export function useCreateCommentForm(versionId: string) {
    const form = useForm<TFormState>({
        defaultValues: {
            message: ""
        }
    });

    const { createComment, isPending } = useCreateDocumentComment();

    const onSubmit = form.handleSubmit((data: TFormState) => {
        form.reset();

        createComment({
            message: data.message,
            versionId: versionId
        });
    });

    return {
        form,
        onSubmit,
        isPending
    };
}
