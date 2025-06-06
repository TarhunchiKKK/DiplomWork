import { useVerifyDocumentHash } from "@/entities/documents";
import { useEffect } from "react";

export function useDownloadButton() {
    const { mutate: verifyDocumentHash, isPending, isSuccess, isError } = useVerifyDocumentHash();

    useEffect(() => {
        // verifyDocumentHash(mocks.verifyDocumentHashDto);
    }, [verifyDocumentHash]);

    return {
        isPending,
        isSuccess,
        isError
    };
}
