import { useCreateDocument } from "@/entities/documents";
import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { toast } from "sonner";
import { useState } from "react";
import { HashingService } from "@/shared/crypto";
import { DocumentsS3Service } from "@/shared/s3";

export function useCreateDocumentButton() {
    const [isHashingPending, setIsHashingPending] = useState(false);

    const { mutate: createDocument, isPending: isDocumentCreatingPending } = useCreateDocument();

    const form = useForm<TFormState>({
        defaultValues: {
            isUrgent: false
        }
    });

    const onSubmit = form.handleSubmit(async (data: TFormState) => {
        if (data.files?.length !== 1) {
            toast.error("Файл долженбыть один.");
            return;
        }

        setIsHashingPending(true);

        createDocument({
            ...data,
            title: data.files[0].name,
            hash: await HashingService.hash(data.files[0]),
            s3Name: DocumentsS3Service.generateKey(data.files[0].name)
        });

        setIsHashingPending(false);
    });

    return {
        form,
        onSubmit,
        isPending: isDocumentCreatingPending || isHashingPending
    };
}
