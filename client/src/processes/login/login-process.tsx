"use client";

import { useState } from "react";
import { LoginForm, TotpLoginForm } from "@/widgets/auth";
import { useLoginStep, useTotpLoginStep } from "./hooks";
import { TTotpLoginPayload } from "./types";

export function LoginProcess() {
    const [step, setStep] = useState(0);

    const { totpLoginPayload, handleLogin } = useLoginStep(setStep);

    const { handleTotpLogin } = useTotpLoginStep();

    return (
        <>
            {step === 0 && <LoginForm next={handleLogin} payload={null} />}

            {step === 1 && <TotpLoginForm next={handleTotpLogin} payload={totpLoginPayload as TTotpLoginPayload} />}
        </>
    );
}
