"use client";

import { TTagsCloudProps } from "./types";

export function TagsCloud<T>({ items, renderItem, className }: TTagsCloudProps<T>) {
    return (
        <div className={`flex flex-row justify-start items-center flex-wrap gap-4 ${className}`}>
            {items.map(renderItem)}
        </div>
    );
}
