import { credentialsManager } from "@/features/auth";
import { HttpHeadersBuilder, queryUrls } from "@/shared/api";
import { httpErrorHandler } from "@/shared/validation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type TDto = {
    hash: string;

    sign: string;
};

type TResponse = {
    valid: boolean;
};

export function useVerifyDocumentHash() {
    return useMutation({
        mutationFn: async (dto: TDto) => {
            const token = credentialsManager.jwt.get();

            const response = await axios.post<TResponse>(queryUrls.documents.hash.verify, dto, {
                headers: new HttpHeadersBuilder().setBearerToken(token).build()
            });

            if (!response.data.valid) {
                throw new Error("Неверный хеш");
            }
        },
        onError: httpErrorHandler
    });
}
