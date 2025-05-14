import { DocumentInfo, DocumentInfoSkeleton } from "@/widgets/document";
import { VersionsList, VersionsListSkeleton } from "@/widgets/versions";
import { Suspense } from "react";

export default function DocumentPage() {
    return (
        <div className="space-y-8">
            <Suspense fallback={<DocumentInfoSkeleton />}>
                {/* <DocumentInfo /> */}

                <DocumentInfoSkeleton />
            </Suspense>

            <Suspense fallback={<VersionsListSkeleton />}>
                {/* <VersionsList/> */}

                <VersionsListSkeleton />
            </Suspense>
        </div>
    );
}
