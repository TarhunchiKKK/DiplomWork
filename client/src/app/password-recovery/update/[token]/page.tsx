"use client";

import { UpdatePasswordForm } from "@/features/password-recovery";
import { useParams } from "next/navigation";

export default function UpdatePasswordPage() {
    const { token } = useParams() as { token: string };

    return <UpdatePasswordForm recoveryToken={token} />;
}
