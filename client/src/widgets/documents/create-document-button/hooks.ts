import { useCreateDocument } from "@/entities/documents";
import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { toast } from "sonner";

export function useCreateDocumentButton() {
    const form = useForm<TFormState>({
        defaultValues: {
            isUrgent: false
        }
    });

    const { createDocument, isPending } = useCreateDocument();

    const onSubmit = form.handleSubmit((data: TFormState) => {
        if (data.files?.length !== 1) {
            toast.error("Файл долженбыть один.");
            return;
        }

        createDocument({
            ...data,
            filename: data.files[0].name,
            hash: "hash"
        });
    });

    return {
        form,
        onSubmit,
        isPending
    };
}
