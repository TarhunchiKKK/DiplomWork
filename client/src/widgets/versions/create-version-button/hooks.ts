import { useProfileStore } from "@/features/auth";
import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { useCreateDocumentVersion, useOneDocument } from "@/entities/documents";
import { toast } from "sonner";
import { DocumentsS3Service } from "@/shared/s3";
import { HashingService } from "@/shared/crypto";
import { useState } from "react";

export function useCreateVersionButton(documentId: string) {
    const [isHashingPending, setIsHashingPending] = useState(false);

    const form = useForm<TFormState>({
        defaultValues: {
            description: ""
        }
    });

    const { data: document } = useOneDocument(documentId);

    const profile = useProfileStore(state => state.profile);

    const { mutate: create, isPending: isVersionCreatingPending } = useCreateDocumentVersion();

    const onSubmit = form.handleSubmit(async (data: TFormState) => {
        if (data.files?.length !== 1) {
            toast.error("Файл долженбыть один.");
            return;
        }

        setIsHashingPending(true);

        create({
            documentId: document!.id,
            description: data.description || undefined,
            s3Name: DocumentsS3Service.generateKey(data.files[0].name),
            hash: await HashingService.hash(data.files[0])
        });

        setIsHashingPending(false);

        form.reset();
    });

    return {
        display: profile?.id === document?.authorId,
        form,
        onSubmit,
        isPending: isHashingPending || isVersionCreatingPending
    };
}
