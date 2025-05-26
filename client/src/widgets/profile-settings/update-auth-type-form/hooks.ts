import { TProfile, useDisableTotp, useProfileStore } from "@/features/auth";
import { dropdownOptions } from "./constants";
import { useState } from "react";
import { AuthType } from "@/entities/users";
import { routes } from "@/shared/routing";
import { useRouter } from "next/navigation";

export function useUpdateAuthType() {
    const router = useRouter();

    const { mutate: disableTotp, isPending: isTotpDisablingPending } = useDisableTotp();

    const update = (authType: AuthType) => {
        switch (authType) {
            case AuthType.BASIC:
                disableTotp();
                router.push(routes.settings.profile);
                break;
            case AuthType.TOTP:
                router.push(routes.auth.enableTotp);
                break;
            default:
                break;
        }
    };

    return { update, isPending: isTotpDisablingPending };
}

export function useUpdateAuthTypeForm() {
    const profile = useProfileStore(state => state.profile) as TProfile;

    const [authType, setAuthType] = useState(profile.authType);

    const buttonLabel = dropdownOptions.find(option => option.value === authType)?.label as string;

    return {
        buttonLabel,
        authType,
        setAuthType
    };
}
