import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { useCreateDocumentComment, useCurrentDocumentStore } from "@/entities/documents";

export function useCreateCommentForm() {
    const versionId = useCurrentDocumentStore(state => state.versionId) as string;

    const form = useForm<TFormState>({
        defaultValues: {
            message: ""
        }
    });

    const { createComment, isPending } = useCreateDocumentComment();

    const onSubmit = form.handleSubmit((data: TFormState) => {
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
