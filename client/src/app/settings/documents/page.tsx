import { RequireAdminRole } from "@/features/auth";
import { Separator } from "@/shared/ui";
import { DocumentAimsForm, DocumentTypesForm } from "@/widgets/organization-settings";

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
