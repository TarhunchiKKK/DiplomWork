import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TUserInfo } from "../models";

export function useOneUser(userId: string, enabled: boolean = true) {
    return useQuery({
        queryKey: queryKeys.users.findOne(userId),
        queryFn: async () => {
            const token = credentialsManager.jwt.get();

            const response = await axios.get<TUserInfo>(queryUrls.users.find.one(userId), {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });

            return response.data;
        },
        enabled: enabled
    });
}
