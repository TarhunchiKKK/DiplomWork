import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authCredentialsManager, TProfile, useProfileStore } from "@/features/auth";
import axios, { AxiosError } from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { useDivisionsStore } from "./store";
import { useOrganization } from "../../hooks";
import { useEffect } from "react";

function useSetupDivisionsStore() {
    const { organization } = useOrganization();

    const setDivisions = useDivisionsStore(state => state.setData);

    useEffect(() => {
        if (organization) {
            setDivisions(organization.administrativeDivisions);
        }
    }, [organization, setDivisions]);
}

export function useDivisionsForm() {
    useSetupDivisionsStore();

    const queryClient = useQueryClient();

    const divisions = useDivisionsStore(state => state.divisions);

    const profile = useProfileStore(state => state.profile) as TProfile;

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const token = authCredentialsManager.jwt.get();

            const dto = {
                organizationId: profile.organizationId,
                administrativeDivisions: divisions
            };

            await axios.patch(queryUrls.organizations.updateAdministrativeDivisions, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(token).get()
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
        divisions,
        update: mutate,
        isPending
    };
}
