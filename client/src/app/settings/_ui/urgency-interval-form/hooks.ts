import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TUpdateDto } from "./types";
import axios, { AxiosError } from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { localStorageService } from "@/shared/utils";
import { toast } from "sonner";
import { extractValidationMessages, TValidationError } from "@/shared/validation";
import { TOrganization, useOrganizationStore } from "@/entities/organizations";
import { useForm } from "react-hook-form";

export function useUpdate() {
    const setUrgencyInterval = useOrganizationStore(state => state.setUrgencyInterval);

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TUpdateDto) => {
            const jwtToken = localStorageService.token.get();

            await axios.patch(queryUrls.organizations.updateUrgencyInterval, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(jwtToken).get()
            });
        },
        onSettled: () => {},
        onSuccess: (_, dto) => {
            toast.success("Обновлено успешно");

            setUrgencyInterval(dto.urgencyInterval);

            queryClient.invalidateQueries({ queryKey: queryKeys.organizations.base });
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

    const form = useForm<TUpdateDto>({
        defaultValues: {
            organizationId: organization._id,
            urgencyInterval: organization.urgencyInterval
        }
    });

    const { update, isPending } = useUpdate();

    const onSubmit = (data: TUpdateDto) => {
        update(data);
    };

    return {
        form,
        onSubmit,
        isPending
    };
}
