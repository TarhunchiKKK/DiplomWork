import { TVersion } from "@/entities/documents";

export type TItemProps = {
    version: TVersion;

    onClick: (_: string) => void;
};
