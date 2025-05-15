import { TProfile, useProfileStore } from "@/features/auth";
import { useCurrentDocument } from "@/widgets/documents";
import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { useCreateDocumentVersion } from "@/entities/documents";
import { toast } from "sonner";
import { getFileExtensions } from "@/shared/helpers";

export function useCreateVersionButton() {
    const form = useForm<TFormState>({
        defaultValues: {
            description: ""
        }
    });

    const { document } = useCurrentDocument();

    const profile = useProfileStore(state => state.profile) as TProfile;

    const { create, isPending } = useCreateDocumentVersion();

    const onSubmit = form.handleSubmit((data: TFormState) => {
        if (data.files?.length !== 1) {
            toast.error("Файл долженбыть один.");
            return;
        }

        create({
            documentId: document!.id,
            description: data.description || undefined,
            fileExtension: getFileExtensions(data.files[0].name),
            hash: ""
        });
    });

    return {
        display: profile.id === document?.authorId,
        form,
        onSubmit,
        isPending
    };
}
