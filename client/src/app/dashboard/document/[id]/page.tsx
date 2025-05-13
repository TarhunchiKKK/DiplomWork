import { DocumentInfo, DocumentInfoSkeleton } from "@/widgets/document";
import { Suspense } from "react";

export default function DocumentPage() {
    return (
        <Suspense fallback={<DocumentInfoSkeleton />}>
            <DocumentInfoSkeleton />
        </Suspense>
    );
}
