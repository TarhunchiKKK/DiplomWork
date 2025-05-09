import { TProfile, useProfileStore } from "@/features/auth";
import { queryUrls } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TGenerateTotpResponse } from "./types";

export function useGenerateTotp() {
    const [totpResponse, setTotpResponse] = useState<TGenerateTotpResponse | null>(null);
    const profile = useProfileStore(state => state.profile) as TProfile;

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await axios.post<TGenerateTotpResponse>(queryUrls.auth.totp.generate, {
                userId: profile.id,
                userEmail: profile.email
            });

            return response.data;
        },
        onSuccess: response => {
            setTotpResponse(response);
        },
        onError: () => {
            toast.error("Ошибка");
        }
    });

    useEffect(() => {
        mutate();
    }, [mutate]);

    return { totpResponse, isPending };
}
