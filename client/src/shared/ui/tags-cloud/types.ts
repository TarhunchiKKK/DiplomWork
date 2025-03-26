import { PropsWithChildren, ReactNode } from "react";

export type TTagProps = PropsWithChildren<{
    tooltip: ReactNode;
}>;

export type TTagsCloudProps<T> = {
    items: T[];

    renderItem: (_: T) => ReactNode;

    className?: string;
};
