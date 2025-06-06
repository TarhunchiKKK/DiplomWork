"use client";

import { UpdatePasswordForm } from "@/features/password-recovery";
import { useParams } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Password Recovery | Update",
    description: "This page will allow you to update your password."
};

export default function UpdatePasswordPage() {
    const { token } = useParams() as { token: string };

    return <UpdatePasswordForm recoveryToken={token} />;
}
