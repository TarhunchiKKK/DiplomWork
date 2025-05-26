import { TUserInfo } from "@/entities/users";
import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type TResponse = {
    users: TUserInfo[];
};

export function useOrganizationUsers() {
    return useQuery({
        queryKey: queryKeys.users.byOrganization,
        queryFn: async () => {
            const token = credentialsManager.jwt.get() as string;

            const response = await axios.get<TResponse>(queryUrls.users.find.organization, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });

            return response.data.users ?? [];
        },
        placeholderData: []
    });
}
