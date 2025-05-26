"use client";

import { credentialsManager, TProfile, useProfileStore } from "@/features/auth";
import { HttpHeadersBuilder, queryUrls } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { TGenerateTotpResponse } from "../types";
import { httpErrorHandler } from "@/shared/validation";

export function useGenerateTotp() {
    const [isFetched, setIsFetched] = useState(false);

    const profile = useProfileStore(state => state.profile) as TProfile;

    const mutation = useMutation({
        mutationFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.post<TGenerateTotpResponse>(
                queryUrls.auth.totp.generate,
                {
                    userId: profile.id,
                    userEmail: profile.email
                },
                {
                    headers: new HttpHeadersBuilder().setBearerToken(token).build()
                }
            );

            return response.data;
        },
        onSuccess: () => {
            setIsFetched(true);
        },
        onError: httpErrorHandler
    });

    useEffect(() => {
        if (!isFetched) {
            mutation.mutate();
        }
    }, [mutation, isFetched]);

    return mutation;
}
