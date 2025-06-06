import { ResetPasswordForm } from "@/features/password-recovery";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Password Recovery | Reset",
    description: "This page will allow you to reset your password."
};

export default function ResetPasswordPage() {
    return <ResetPasswordForm />;
}
