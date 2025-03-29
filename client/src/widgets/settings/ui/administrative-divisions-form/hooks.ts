import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TUpdateDto } from "./types";
import { authCredentialsManager } from "@/features/auth";
import axios, { AxiosError } from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { useDivisionsStore } from "./store";
import { trimStoreData } from "./helpers";
import { TOrganization, useOrganizationStore } from "@/entities/organizations";
import { use, useEffect } from "react";

export function useUpdate() {
    const queryClient = useQueryClient();

    const storeData = useDivisionsStore(state => state.data);
    const organizationId = useOrganizationStore(state => (state.organization as TOrganization)._id);

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const jwtToken = authCredentialsManager.jwt.get();

            const dto = {
                organizationId,
                administrativeDivisions: trimStoreData(storeData)
            };

            await axios.patch(queryUrls.organizations.updateAdministrativeDivisions, dto, {
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

export function useSetup() {
    const organization = useOrganizationStore(state => state.organization as TOrganization);
    const setDivisions = useDivisionsStore(state => state.setData);

    useEffect(() => {
        setDivisions(organization.administrativeDivisions);
    }, [organization]);
}
