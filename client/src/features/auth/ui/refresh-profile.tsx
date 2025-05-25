"use client";

import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import { credentialsManager } from "../utils";
import axios from "axios";
import { TProfile } from "../types";
import { useProfileStore } from "../lib";

function useRefreshProfile() {
    const setProfile = useProfileStore(state => state.setProfile);

    useQuery({
        queryKey: queryKeys.profile,
        queryFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.get<TProfile & { token: string }>(queryUrls.auth.profile, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });

            return response.data;
        },
        select: profile => {
            credentialsManager.jwt.set(profile.token);

            setProfile(profile);
        },
        enabled: credentialsManager.jwt.have()
    });
}

export function RefreshProfile() {
    useRefreshProfile();

    return <></>;
}
