import { TDocument } from "@/entities/documents";
import { authCredentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryKeys, queryUrls } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

export function useDocument() {
    const { id } = useParams() as { id: string };

    const { data, isLoading } = useQuery({
        queryKey: queryKeys.documents.findOne(id),
        queryFn: async () => {
            const token = authCredentialsManager.jwt.get() as string;

            const response = await axios.get<TDocument>(queryUrls.documents.findOne(id), {
                headers: new HttpHeadersBuilder().setBearerToken(token).get()
            });

            return response.data;
        }
    });

    return {
        document: data,
        isLoading
    };
}
