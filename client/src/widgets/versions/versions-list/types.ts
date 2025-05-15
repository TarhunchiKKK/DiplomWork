import { TVersion } from "@/entities/documents";

export type TProps = {
    className?: string;
};

export type TItemProps = {
    version: TVersion;

    onClick: (_: string) => void;
};
