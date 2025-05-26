import { RequireAdminRole } from "@/features/auth";
import { AdministrativeDivisionsForm } from "@/widgets/organization-settings";

export default function OrganizationSettingsPage() {
    return (
        <RequireAdminRole>
            <AdministrativeDivisionsForm />
        </RequireAdminRole>
    );
}
