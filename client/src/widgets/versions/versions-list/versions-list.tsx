"use client";

import { ScrollArea, ScrollBar } from "@/shared/ui";
import { useVersionsList } from "./hooks";
import { TProps } from "./types";
import { ListItem, ListItemSkeleton } from "./ui";

export function VersionsList({ className }: TProps) {
    const { versions, onClick } = useVersionsList();

    return (
        <ScrollArea className={className}>
            {versions && (
                <div className="space-y-2">
                    {versions.map(version => (
                        <ListItem key={version.id} version={version} onClick={onClick} />
                    ))}
                </div>
            )}

            <ScrollBar />
        </ScrollArea>
    );
}

export function VersionsListSkeleton({ className }: TProps) {
    return (
        <ScrollArea className={className}>
            <div className="space-y-2">
                {new Array(12).fill("").map((_, index) => (
                    <ListItemSkeleton key={index} />
                ))}
            </div>

            <ScrollBar />
        </ScrollArea>
    );
}
