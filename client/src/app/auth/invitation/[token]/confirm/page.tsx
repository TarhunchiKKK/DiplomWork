"use client";

import { ConfirmInvitationForm } from "@/features/auth";
import { useParams } from "next/navigation";

export default function ConfirmInvitationPage() {
    const { token } = useParams() as { token: string };

    return <ConfirmInvitationForm invitationToken={token} />;
}
