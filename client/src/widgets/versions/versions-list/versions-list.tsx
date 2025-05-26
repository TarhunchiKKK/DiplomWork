"use client";

import { ScrollArea, ScrollBar } from "@/shared/ui";
import { TProps, TSkeletonProps } from "./types";
import { ListItem, ListItemSkeleton } from "./ui";
import { useCurrentDocumentStore, useDocumentVersions } from "@/entities/documents";

export function VersionsList({ documentId, className }: TProps) {
    const { data: versions } = useDocumentVersions(documentId);

    const setCurrentVersionId = useCurrentDocumentStore(state => state.setVersionId);

    return (
        <ScrollArea className={className}>
            {versions && (
                <div className="space-y-2">
                    {versions.map(version => (
                        <ListItem
                            key={version.id}
                            version={version}
                            onClick={setCurrentVersionId.bind(null, version.id)}
                        />
                    ))}
                </div>
            )}

            <ScrollBar />
        </ScrollArea>
    );
}

export function VersionsListSkeleton({ className }: TSkeletonProps) {
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
