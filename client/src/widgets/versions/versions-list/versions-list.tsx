"use client";

import { useVersionsList } from "./hooks";
import { ListItem, ListItemSkeleton } from "./ui";

export function VersionsList() {
    const { versions, onClick } = useVersionsList();

    return (
        <>
            {versions && (
                <div className="space-y-2">
                    {versions.map(version => (
                        <ListItem key={version.id} version={version} onClick={onClick} />
                    ))}
                </div>
            )}
        </>
    );
}

export function VersionsListSkeleton() {
    return (
        <div className="space-y-2 abababa">
            {new Array(12).fill("").map((_, index) => (
                <ListItemSkeleton key={index} />
            ))}
        </div>
    );
}
