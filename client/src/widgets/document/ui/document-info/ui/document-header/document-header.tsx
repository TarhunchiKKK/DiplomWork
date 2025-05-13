import { mocks } from "@/shared/mocks";
import { CardDescription, CardHeader, CardTitle } from "@/shared/ui";

const document = mocks.document;

export function DocumentHeader() {
    return (
        <CardHeader>
            <CardTitle>{document.title}</CardTitle>

            <CardDescription>{document.authroId}</CardDescription>
        </CardHeader>
    );
}
