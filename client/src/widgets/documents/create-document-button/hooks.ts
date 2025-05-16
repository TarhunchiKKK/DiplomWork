import { useCreateDocument } from "@/entities/documents";
import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { getFileExtension } from "@/shared/helpers";
import { toast } from "sonner";

export function useCreateDocumentButton() {
    const form = useForm<TFormState>({
        defaultValues: {
            title: "",
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
            fileExtension: getFileExtension(data.files[0].name),
            hash: ""
        });
    });

    return {
        form,
        onSubmit,
        isPending
    };
}
