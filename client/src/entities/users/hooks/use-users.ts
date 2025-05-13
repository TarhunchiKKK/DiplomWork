import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TUserInfo } from "../types";
import { authCredentialsManager } from "@/features/auth";

type TArg = {
    ids: string[];

    enabled: boolean;
};

export function useMultipleUsers(arg: TArg) {
    const { data, isLoading } = useQuery({
        queryKey: queryKeys.users.findMany(arg.ids),
        queryFn: async () => {
            const token = authCredentialsManager.jwt.get();

            const response = await axios.get<TUserInfo[]>(queryUrls.users.find.ids, {
                headers: new HttpHeadersBuilder().setBearerToken(token).get(),
                params: {
                    ids: arg.ids
                }
            });
            return response.data;
        },
        enabled: arg.enabled
    });

    return { users: data, isLoading };
}
