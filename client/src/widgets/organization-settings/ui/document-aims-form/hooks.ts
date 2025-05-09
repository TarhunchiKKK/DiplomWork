import { authCredentialsManager, TProfile, useProfileStore } from "@/features/auth";
import { queryUrls, HttpHeadersBuilder, queryKeys } from "@/shared/api";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { TFormState, TUpdateItemDto } from "./types";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useOrganization } from "../../hooks";
import { useCompareableSet } from "@/shared/hooks";

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
    const queryClient = useQueryClient();

    const profile = useProfileStore(state => state.profile) as TProfile;

    const { mutate, isPending } = useMutation({
        mutationFn: async (documentAims: TUpdateItemDto[]) => {
            const token = authCredentialsManager.jwt.get();

            await axios.patch(
                queryUrls.organizations.updateDocumentAims,
                {
                    organizationId: profile.organizationId,
                    documentAims: documentAims
                },
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).get()
                }
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.organizations.base });
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
