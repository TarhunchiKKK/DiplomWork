import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TFormState, TUpdateItemDto } from "./types";
import { authCredentialsManager, TProfile, useProfileStore } from "@/features/auth";
import axios, { AxiosError } from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { extractValidationMessages, TValidationError } from "@/shared/validation";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useOrganization } from "../../hooks";
import { useCompareableSet } from "@/shared/hooks";

export function useDocumentTypesForm() {
    const { organization, isLoading } = useOrganization();

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
    const queryClient = useQueryClient();

    const profile = useProfileStore(state => state.profile) as TProfile;

    const { mutate, isPending } = useMutation({
        mutationFn: async (documentTypes: TUpdateItemDto[]) => {
            const token = authCredentialsManager.jwt.get();

            await axios.patch(
                queryUrls.organizations.updateDocumentTypes,
                {
                    organizationId: profile.organizationId,
                    documentTypes: documentTypes
                },
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).get()
                }
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.organizations.findOne });
        },
        onSuccess: () => {
            toast.success("Обновлено успешно");
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => {
                toast.error(message);
            });
        }
    });

    return {
        update: mutate,
        isPending
    };
}
