import { NotificationsListSkeleton } from "@/widgets/notifications";
import { Suspense } from "react";
import { Metadata } from "next";
import { PageContent } from "./content";

export const metadata: Metadata = {
    title: "Notifications",
    description: "On this page you can see your notifications."
};

export default function NotificationsPage() {
    return (
        <Suspense fallback={<NotificationsListSkeleton />}>
            <PageContent />
        </Suspense>
    );
}
