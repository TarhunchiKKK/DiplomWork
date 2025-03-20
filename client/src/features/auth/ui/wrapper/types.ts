import { PropsWithChildren } from "react";

export type TProps = PropsWithChildren<{
    heading: string;

    description?: string;

    backButtonLabel?: string;

    backButtonHref?: string;
}>;
