import { TVersion } from "@/entities/documents";

export type TProps = {
    documentId: string;

    className?: string;
};

export type TSkeletonProps = {
    className?: string;
};

export type TItemProps = {
    version: TVersion;

    onClick: (_: string) => void;
};
