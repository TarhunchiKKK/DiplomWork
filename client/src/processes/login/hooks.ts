import { credentialsManager, useProfileStore } from "@/features/auth";
import { TLoginResult, TTotpLoginPayload } from "./types";
import { useState } from "react";
import { routes } from "@/shared/routing";
import { AuthType } from "@/entities/users";
import { useRouter } from "next/navigation";

function useEndLogin() {
    const setProfile = useProfileStore(state => state.setProfile);

    const router = useRouter();

    const endLogin = (result: TLoginResult) => {
        credentialsManager.jwt.set(result.token);

        setProfile(result);

        router.push(routes.dashboard.index);
    };

    return endLogin;
}

export function useLoginStep(setStep: (_: number) => void) {
    const [totpLoginPayload, setTotpLoginPayload] = useState<TTotpLoginPayload | null>(null);

    const endLogin = useEndLogin();

    const handleLogin = (result: TLoginResult) => {
        if (result.authType === AuthType.BASIC) {
            endLogin(result);
        } else {
            setTotpLoginPayload({
                userId: result.id,
                userEmail: result.email
            });

            setStep(1);
        }
    };

    return { totpLoginPayload, handleLogin };
}

export function useTotpLoginStep() {
    const endLogin = useEndLogin();

    return { handleTotpLogin: endLogin };
}
