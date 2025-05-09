import { Separator } from "@/shared/ui";
import { DocumentAimsForm, DocumentTypesForm } from "@/widgets/organization-settings";

export default function DocumentsSettings() {
    return (
        <div>
            <DocumentTypesForm />

            <Separator className="my-6" />

            <DocumentAimsForm />
        </div>
    );
}
