import { Separator } from "@/shared/ui";
import { DocumentAimsForm, DocumentTypesForm, UrgencyIntervalForm } from "@/widgets/settings";

export default function DocumentsSettings() {
    return (
        <div>
            <UrgencyIntervalForm />

            <Separator className="my-6" />

            <DocumentTypesForm />

            <Separator className="my-6" />

            <DocumentAimsForm />
        </div>
    );
}
