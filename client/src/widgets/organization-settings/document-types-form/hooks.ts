import { TFormState, TUpdateItemDto } from "./types";
import { TProfile, useProfileStore } from "@/features/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useCompareableSet } from "@/shared/hooks";
import { useOrganization, useUpdateDocumentTypes } from "@/entities/organizations";

export function useDocumentTypesForm() {
    const { data: organization, isLoading } = useOrganization();

    const extractValue = useCallback((aim: TUpdateItemDto) => aim.value, []);

    const documentTypesSet = useCompareableSet<TUpdateItemDto, string>(organization?.documentTypes || [], extractValue);

    const form = useForm<TFormState>({
        defaultValues: {
            value: ""
        }
    });

    const onSubmit = form.handleSubmit((data: TFormState) => {
        const result = documentTypesSet.add(data);

        if (!result) {
            toast.warning("Цель уже существует");
        }

        form.reset();
    });

    return {
        documentTypesSet,
        form,
        onSubmit,
        isLoading
    };
}

export function useUpdate() {
    const profile = useProfileStore(state => state.profile) as TProfile;

    const { mutate: updateDocumentTypes, isPending } = useUpdateDocumentTypes();

    const update = (documentTypes: TUpdateItemDto[]) => {
        updateDocumentTypes({
            organizationId: profile.organizationId,
            documentTypes: documentTypes
        });
    };

    return {
        update,
        isPending
    };
}
