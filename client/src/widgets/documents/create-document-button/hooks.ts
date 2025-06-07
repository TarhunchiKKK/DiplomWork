import { useCreateDocument } from "@/entities/documents";
import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { toast } from "sonner";

export function useCreateDocumentButton() {
    const { mutate: createDocument, isPending } = useCreateDocument();

    const form = useForm<TFormState>({
        defaultValues: {
            isUrgent: false
        }
    });

    const onSubmit = form.handleSubmit((data: TFormState) => {
        if (data.files?.length !== 1) {
            toast.error("Файл долженбыть один.");
            return;
        }

        createDocument({
            ...data,
            title: data.files[0].name,
            hash: "hash",
            s3Name: "s3-name"
        });
    });

    return {
        form,
        onSubmit,
        isPending
    };
}
