"use client";

import { useState } from "react";
import { useEnableTotpStep, useGenerateTotpStep } from "./hooks";
import { EnableTotpForm, TotpQrCard } from "@/widgets/authentication";

export function TotpEnablingProcess() {
    const [step, setStep] = useState(0);

    const { secret, handleGenerateTotp } = useGenerateTotpStep(setStep);

    const { handleEnableTotp } = useEnableTotpStep();

    return (
        <>
            {step === 0 && <TotpQrCard next={handleGenerateTotp} payload={null} />}

            {step === 1 && <EnableTotpForm next={handleEnableTotp} payload={secret as string} />}
        </>
    );
}
