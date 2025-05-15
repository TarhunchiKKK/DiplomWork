import { TProfile, useProfileStore } from "@/features/auth";
import { toast } from "sonner";
import { TFormState, TUpdateItemDto } from "./types";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useCompareableSet } from "@/shared/hooks";
import { useOrganization, useUpdateDocumentAims } from "@/entities/organizations";

export function useDocumentAimsForm() {
    const { organization, isLoading } = useOrganization();

    const extractValue = useCallback((aim: TUpdateItemDto) => aim.value, []);

    const documentAimsSet = useCompareableSet<TUpdateItemDto, string>(organization?.documentAims || [], extractValue);

    const form = useForm<TFormState>({
        defaultValues: {
            value: ""
        }
    });

    const onSubmit = form.handleSubmit((data: TFormState) => {
        const result = documentAimsSet.add(data);

        if (!result) {
            toast.warning("Цель уже существует");
        }

        form.reset();
    });

    return {
        documentAimsSet,
        form,
        onSubmit,
        isLoading
    };
}

export function useUpdate() {
    const profile = useProfileStore(state => state.profile) as TProfile;

    const { updateDocumentAims, isPending } = useUpdateDocumentAims();

    const update = (documentAims: TUpdateItemDto[]) => {
        updateDocumentAims({
            organizationId: profile.organizationId,
            documentAims: documentAims
        });
    };

    return {
        update,
        isPending
    };
}
