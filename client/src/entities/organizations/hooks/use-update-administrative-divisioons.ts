import { credentialsManager } from "@/features/auth";
import { queryUrls, HttpHeadersBuilder, queryKeys } from "@/shared/api";
import { TValidationError, extractValidationMessages } from "@/shared/validation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

type TUpdatePostDto = {
    _id?: string;

    title: string;
};
type TUpdateDivisionDto = {
    _id?: string;

    title: string;

    posts: TUpdatePostDto[];
};

type TUpdateDto = {
    organizationId: string;
    administrativeDivisions: TUpdateDivisionDto[];
};

export function useUpdateAdministrativeDivisioons() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (dto: TUpdateDto) => {
            const token = credentialsManager.jwt.get();

            await axios.patch(queryUrls.organizations.updateAdministrativeDivisions, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.organizations.findOne });
        },
        onSuccess: () => {
            toast.success("Обновлено успешно");
        },
        onError: (error: AxiosError<TValidationError>) => {
            extractValidationMessages(error).forEach(message => {
                toast.error(message);
            });
        }
    });

    return {
        updateAdministrativeDivisioons: mutate,
        isPending
    };
}
