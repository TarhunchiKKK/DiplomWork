"use client";

import { environment } from "@/shared/config";
import { TProps } from "./types";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";

export function Captcha({ onChange }: TProps) {
    const { theme } = useTheme();

    return (
        <div className="flex justify-center">
            <ReCAPTCHA
                sitekey={environment.recaptchaKey}
                onChange={onChange}
                theme={theme === "light" ? "light" : "dark"}
            />
        </div>
    );
}
