import { RequireAdminRole } from "@/features/auth";
import { Separator } from "@/shared/ui";
import { DocumentAimsForm, DocumentTypesForm } from "@/widgets/organization-settings";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings | Documents",
    description: "This page will allow you to specify document types and document aims  available in your organization."
};

export default function DocumentsSettingsPage() {
    return (
        <RequireAdminRole>
            <div>
                <DocumentTypesForm />

                <Separator className="my-6" />

                <DocumentAimsForm />
            </div>
        </RequireAdminRole>
    );
}
