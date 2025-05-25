import { queryKeys, queryUrls, HttpHeadersBuilder } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useProfileStore } from "../lib";
import { TProfile } from "../types";
import { credentialsManager } from "../utils";

export function useRefreshProfile() {
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
