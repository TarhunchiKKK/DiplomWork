import { TOrganization } from "@/entities/organizations";
import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useOrganization() {
    const token = credentialsManager.jwt.get() as string;

    const { data, isLoading } = useQuery({
        queryKey: queryKeys.organizations.findOne,
        queryFn: async () => {
            const response = await axios.get<TOrganization>(queryUrls.organizations.findOne, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
            return response.data;
        }
    });

    return {
        organization: data,
        isLoading
    };
}
