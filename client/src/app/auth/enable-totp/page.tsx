import { RequireAuth } from "@/features/auth";
import { TotpEnablingProcess } from "@/processes";

export default function EnableTotpPage() {
    return (
        <RequireAuth>
            <TotpEnablingProcess />
        </RequireAuth>
    );
}
