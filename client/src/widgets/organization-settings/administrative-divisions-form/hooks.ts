import { TProfile, useProfileStore } from "@/features/auth";
import { useDivisionsStore } from "./store";
import { useEffect } from "react";
import { useOrganization, useUpdateAdministrativeDivisioons } from "@/entities/organizations";

function useSetupDivisionsStore() {
    const { data: organization } = useOrganization();

    const setDivisions = useDivisionsStore(state => state.setData);

    useEffect(() => {
        if (organization) {
            setDivisions(organization.administrativeDivisions ?? []);
        }
    }, [organization, setDivisions]);
}

export function useDivisionsForm() {
    useSetupDivisionsStore();

    const divisions = useDivisionsStore(state => state.divisions);

    const profile = useProfileStore(state => state.profile) as TProfile;

    const { mutate: updateAdministrativeDivisioons, isPending } = useUpdateAdministrativeDivisioons();

    const update = () => {
        updateAdministrativeDivisioons({
            organizationId: profile.organizationId,
            administrativeDivisions: divisions
        });
    };

    return {
        divisions,
        update,
        isPending
    };
}
