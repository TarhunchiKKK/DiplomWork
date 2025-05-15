"use client";

import { Button, Skeleton } from "@/shared/ui";
import { useDownloadButton } from "./hooks";
import { ErrorPlaceholder, PendingPlaceholder, SuccessPlaceholder } from "./ui";

export function DownloadButton() {
    const { isPending, isSuccess, isError } = useDownloadButton();

    return (
        <>
            {isPending && <PendingPlaceholder />}

            {!isPending && (
                <>
                    {isSuccess && (
                        <div className="space-y-2">
                            <SuccessPlaceholder />

                            <Button className="w-full">Скачать</Button>
                        </div>
                    )}

                    {isError && <ErrorPlaceholder />}
                </>
            )}
        </>
    );
}

export function DownloadButtonSkeleton() {
    return <Skeleton className="w-full h-9 rounded-sm" />;
}
