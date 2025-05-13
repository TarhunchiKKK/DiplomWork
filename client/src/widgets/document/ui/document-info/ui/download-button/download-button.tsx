import { Button, Skeleton } from "@/shared/ui";

export function DownloadButton() {
    return <Button className="w-full">Скачать</Button>;
}

export function DownloadButtonSkeleton() {
    return <Skeleton className="w-full h-9 rounded-sm" />;
}
