import { useOneDocument } from "@/entities/documents";
import { routes } from "@/shared/routing";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useDocumentInfo(documentId: string) {
    const { data: document, error } = useOneDocument(documentId);

    const router = useRouter();

    useEffect(() => {
        if ((error as AxiosError)?.status === 403) {
            router.replace(routes.static.forbidden);
        }
    }, [error, router]);

    return { document };
}
