"use client";

import { Button, FormWrapper, Skeleton } from "@/shared/ui";
import { Suspense } from "react";
import { TProps } from "./types";
import Image from "next/image";
import { useGenerateTotp } from "../../hooks";

export function TotpQrCard(props: TProps) {
    const { data: totpResponse, isPending } = useGenerateTotp();

    return (
        <FormWrapper
            heading="Активация TOTP"
            description="Отсканируйте QR-код ниже для активации аутентификации с помощью TOTP"
        >
            <div className="space-y-4">
                <Suspense fallback={<Skeleton className="w-[400px] h-[400px] rounded-sm" />}>
                    {totpResponse && <Image src={totpResponse.qrCode} alt="QR-Code" width={400} height={400} />}
                </Suspense>

                <Button
                    disabled={isPending}
                    className="w-full"
                    onClick={props.next.bind(null, totpResponse?.secret as string)}
                >
                    Далее
                </Button>
            </div>
        </FormWrapper>
    );
}
