import { credentialsManager, TProfile, useProfileStore } from "@/features/auth";
import { dropdownOptions } from "./constants";
import { useState } from "react";
import { AuthType } from "@/entities/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { toast } from "sonner";
import { routes } from "@/shared/routing";
import { redirect } from "next/navigation";

export function useDisableTotp() {
    const queryClient = useQueryClient();

    const { mutate: disableTotp, isPending: isTotpDisablingPending } = useMutation({
        mutationFn: async () => {
            const token = credentialsManager.jwt.get();

            await axios.patch(
                queryUrls.auth.totp.disable,
                {},
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );
        },
        onSuccess: () => {
            toast.success("Обновлено");

            queryClient.invalidateQueries({ queryKey: queryKeys.profile });
        },
        onError: () => {
            toast.error("Ошибка");
        }
    });

    const update = (authType: AuthType) => {
        switch (authType) {
            case AuthType.BASIC:
                disableTotp();
                break;
            case AuthType.TOTP:
                redirect(routes.auth.enableTotp);
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
