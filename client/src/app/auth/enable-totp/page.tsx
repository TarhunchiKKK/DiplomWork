import { RequireAuth } from "@/features/auth";
import { TotpEnablingProcess } from "@/processes";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings | TOTP",
    description: "This page will allow you to switch on two-factor authentication."
};

export default function EnableTotpPage() {
    return (
        <RequireAuth>
            <TotpEnablingProcess />
        </RequireAuth>
    );
}
