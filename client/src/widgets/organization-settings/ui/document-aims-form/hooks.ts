import { authCredentialsManager } from "@/features/auth";
import { queryUrls, HttpHeadersBuilder, queryKeys } from "@/shared/api";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { TFormState, TUpdateDto, TUpdateItemDto } from "./types";
import { useOrganizationStore, TOrganization } from "@/entities/organizations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TWithTempId, addTempId } from "../../helpers";

export function useUpdate() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TUpdateDto) => {
            const jwtToken = authCredentialsManager.jwt.get();

            await axios.patch(queryUrls.organizations.updateDocumentAims, dto, {
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

    const [documentAims, setDocumentAims] = useState<TWithTempId<TUpdateItemDto>[]>(
        (organization.documentAims || []).map(addTempId)
    );

    const addDocumentAim = (data: TUpdateItemDto) => {
        setDocumentAims([...documentAims, addTempId(data)]);
    };

    const removeDocumentAim = (tempId: string) => {
        setDocumentAims(documentAims.filter(documentAims => documentAims.tempId !== tempId));
    };

    const form = useForm<TFormState>({
        defaultValues: {
            value: ""
        }
    });

    const onSubmit = (data: TFormState) => {
        if (form.getValues().value) {
            addDocumentAim(data);
            form.reset();
        }
    };

    return {
        form,
        onSubmit,
        documentAims: {
            data: documentAims,
            add: addDocumentAim,
            remove: removeDocumentAim
        },
        organization
    };
}
