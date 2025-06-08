import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { toast } from "sonner";
import { useSignWorkflow } from "@/entities/workflows";
import { DocumentsS3Service } from "@/shared/s3";

export function useSignWorkflowButton(documentId: string) {
    const { mutate: signWorkflow, isPending } = useSignWorkflow();

    const form = useForm<TFormState>();

    const onSubmit = form.handleSubmit(async (data: TFormState) => {
        if (data.files?.length !== 1) {
            toast.error("Файл долженбыть один.");
            return;
        }

        signWorkflow({
            documentId: documentId,
            signedDocumentS3Name: DocumentsS3Service.generateKey(data.files[0].name)
        });
    });

    return { form, onSubmit, isPending };
}
