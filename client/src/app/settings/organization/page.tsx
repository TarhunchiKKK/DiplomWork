import { RequireAdminRole } from "@/features/auth";
import { AdministrativeDivisionsForm } from "@/widgets/organization-settings";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings | Organization",
    description: "This page will allow you to specify administrativee hierarchy in your organization."
};

export default function OrganizationSettingsPage() {
    return (
        <RequireAdminRole>
            <AdministrativeDivisionsForm />
        </RequireAdminRole>
    );
}
