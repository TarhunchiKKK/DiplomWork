import { DocumentTypesForm, UrgencyIntervalForm } from "@/widgets/settings";

export default function Settings() {
    return (
        <div className="flex flex-col items-start gap-6">
            <UrgencyIntervalForm />

            <DocumentTypesForm />
        </div>
    );
}
