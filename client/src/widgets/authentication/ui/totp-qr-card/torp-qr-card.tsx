import { Button, FormWrapper, Skeleton } from "@/shared/ui";
import { useGenerateTotp } from "./hooks";
import { Suspense } from "react";
import { QRCodeSVG } from "qrcode.react";

export function TotpQrCard() {
    const { totpResponse, isPending } = useGenerateTotp();

    return (
        <FormWrapper
            heading="Активация TOTP"
            description="Отсканируйте QR-код ниже для активации аутентификации с помощью TOTP"
        >
            <div className="space-y-4">
                <Suspense fallback={<Skeleton className="w-[400px] h-[400px] rounded-sm" />}>
                    {totpResponse && <QRCodeSVG value={totpResponse.qrCode} size={400} />}
                </Suspense>

                <Button disabled={isPending} className="w-full">
                    Далее
                </Button>
            </div>
        </FormWrapper>
    );
}
