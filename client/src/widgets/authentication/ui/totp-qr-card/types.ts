import { TProcessProps } from "@/shared/types";

export type TGenerateTotpResponse = {
    qrCode: string;

    secret: string;
};

export type TProps = TProcessProps<string, null>;
