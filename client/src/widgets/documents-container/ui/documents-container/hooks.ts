import { queryKeys } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

export function useDocuments() {
    const { data, isLoading } = useQuery({
        queryKey: queryKeys()
    });

    return {
        documents: data,
        isLoading
    };
}
