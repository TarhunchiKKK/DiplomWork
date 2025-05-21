import { routes } from "@/shared/routing";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useGenerateTotpStep(setStep: (_: number) => void) {
    const [secret, setSecret] = useState<string | null>(null);

    const handleGenerateTotp = (secret: string) => {
        setSecret(secret);
        setStep(1);
    };

    return { secret, handleGenerateTotp };
}

export function useEnableTotpStep() {
    const router = useRouter();

    const handleEnableTotp = () => {
        router.push(routes.settings.profile);
    };

    return { handleEnableTotp };
}
