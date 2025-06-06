"use client";

import { ConfirmInvitationForm } from "@/features/auth";
import { useParams } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth | Invitation",
    description: "This page will allow you to register in the system."
};

export default function ConfirmInvitationPage() {
    const { token } = useParams() as { token: string };

    return <ConfirmInvitationForm invitationToken={token} />;
}
