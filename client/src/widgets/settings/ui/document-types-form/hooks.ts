import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TformState, TUpdateDto, TUpdateItemDto } from "./types";
import { authCredentialsManager } from "@/features/auth";
import axios, { AxiosError } from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { extractValidationMessages, TValidationError } from "@/shared/validation";
import { TOrganization, useOrganizationStore } from "@/entities/organizations";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addTempId, TWithTempId } from "../../helpers";

export function useUpdate() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TUpdateDto) => {
            const jwtToken = authCredentialsManager.jwt.get();

            await axios.patch(queryUrls.organizations.updateDocumentTypes, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(jwtToken).get()
            });
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

export function useFormState() {
    const organization = useOrganizationStore(state => state.organization) as TOrganization;

    const [documentTypes, setDocumentTypes] = useState<TWithTempId<TUpdateItemDto>[]>(
        (organization.documentTypes || []).map(addTempId)
    );

    const addDocumentType = (data: TUpdateItemDto) => {
        setDocumentTypes([...documentTypes, addTempId(data)]);
    };

    const removeDocumentType = (tempId: string) => {
        setDocumentTypes(documentTypes.filter(documentType => documentType.tempId !== tempId));
    };

    const form = useForm<TformState>({
        defaultValues: {
            value: ""
        }
    });

    const onSubmit = (data: TformState) => {
        if (form.getValues().value) {
            addDocumentType(data);
            form.reset();
        }
    };

    return {
        form,
        onSubmit,
        documentTypes: {
            data: documentTypes,
            add: addDocumentType,
            remove: removeDocumentType
        }
    };
}
