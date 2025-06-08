import { useCurrentDocumentStore, useOneDocumentVersion } from "@/entities/documents";
import { DocumentsS3Service } from "@/shared/s3";
import { toast } from "sonner";

export function useDownloadButton() {
    const versionId = useCurrentDocumentStore(state => state.versionId) as string;

    const { data: version, isLoading } = useOneDocumentVersion(versionId);

    const handleClick = async () => {
        if (version) {
            const fileData = await DocumentsS3Service.download(version.s3Name);

            if (!fileData) {
                toast.error("Ошибка получения файла");
                return;
            }

            const blob = new Blob([new Uint8Array(fileData)], { type: "application/octet-stream" });

            const url = URL.createObjectURL(blob);

            window.open(url, "_blank")?.focus();
        }
    };

    return {
        onClick: handleClick,
        disabled: isLoading
    };
}
