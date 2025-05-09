"use client";

import { Skeleton } from "../generated";
import { TTagsCloudProps } from "./types";

export function TagsCloud<T>({ items, renderItem, className }: TTagsCloudProps<T>) {
    return (
        <div className={`flex flex-row justify-start items-center flex-wrap gap-4 ${className}`}>
            {items.map(renderItem)}
        </div>
    );
}

export function TagsCloudSkeleton() {
    return <TagsCloud items={new Array(12).fill("")} renderItem={() => <Skeleton className="w-32 h-6 rounded-sm" />} />;
}
