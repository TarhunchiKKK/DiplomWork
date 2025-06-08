"use client";

import { Button, Skeleton } from "@/shared/ui";
import { useDownloadButton } from "./hooks";

export function DownloadButton() {
    const buttonProps = useDownloadButton();

    return (
        <Button {...buttonProps} className="w-full">
            Скачать
        </Button>
    );
}

export function DownloadButtonSkeleton() {
    return <Skeleton className="w-full h-9 rounded-sm" />;
}
