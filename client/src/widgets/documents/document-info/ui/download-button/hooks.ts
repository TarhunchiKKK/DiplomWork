import { mocks } from "@/dev";
import { useVerifyDocumentHash } from "@/entities/documents";
import { useEffect } from "react";

export function useDownloadButton() {
    const { verifyDocumentHash, isPending, isSuccess, isError } = useVerifyDocumentHash();

    useEffect(() => {
        verifyDocumentHash(mocks.verifyDocumentHashDto);
    }, [verifyDocumentHash]);

    return {
        isPending,
        isSuccess,
        isError
    };
}
