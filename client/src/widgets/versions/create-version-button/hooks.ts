import { TProfile, useProfileStore } from "@/features/auth";
import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { useCreateDocumentVersion, useOneDocument } from "@/entities/documents";
import { toast } from "sonner";
import { mocks } from "@/dev";

export function useCreateVersionButton(documentId: string) {
    const form = useForm<TFormState>({
        defaultValues: {
            description: ""
        }
    });

    const { data: document } = useOneDocument(documentId);

    const profile = useProfileStore(state => state.profile) as TProfile;

    const { mutate: create, isPending } = useCreateDocumentVersion();

    const onSubmit = form.handleSubmit((data: TFormState) => {
        if (data.files?.length !== 1) {
            toast.error("Файл долженбыть один.");
            return;
        }

        create({
            documentId: document!.id,
            description: data.description || undefined,
            filename: data.files[0].name,
            hash: mocks.hash
        });

        form.reset();
    });

    return {
        display: profile.id === document?.authorId,
        form,
        onSubmit,
        isPending
    };
}
