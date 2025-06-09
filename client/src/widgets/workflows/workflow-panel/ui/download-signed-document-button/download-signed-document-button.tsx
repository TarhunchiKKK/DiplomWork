import { Button } from "@/shared/ui";
import { TProps } from "./types";

export function DownloadSignedDocumentButton({ url }: TProps) {
    return (
        <Button className="cursor-pointer" onClick={() => console.group(url)}>
            Скачать
        </Button>
    );
}
