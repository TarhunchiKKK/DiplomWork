import { TUserInfo } from "@/entities/users";
import { authCredentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useOrganizationUsers() {
    const token = authCredentialsManager.jwt.get() as string;

    const { data, isLoading } = useQuery({
        queryKey: queryKeys.users.byOrganization,
        queryFn: async () => {
            const response = await axios.get<TUserInfo[]>(queryUrls.users.find.organization, {
                headers: new HttpHeadersBuilder().setBearerToken(token).get()
            });

            return response.data;
        }
    });

    return { users: data, isLoading };
}
