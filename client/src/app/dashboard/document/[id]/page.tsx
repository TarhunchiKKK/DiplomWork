import { DevOnly, ProdOnly } from "@/dev";
import { DocumentInfo, DocumentInfoSkeleton } from "@/widgets/document";
import { VersionsList, VersionsListHeader, VersionsListSkeleton } from "@/widgets/versions";
import { Suspense } from "react";

export default function DocumentPage() {
    return (
        <div className="space-y-8">
            <Suspense fallback={<DocumentInfoSkeleton />}>
                <ProdOnly>
                    <DocumentInfo />
                </ProdOnly>

                <DevOnly>
                    <DocumentInfoSkeleton />
                </DevOnly>
            </Suspense>

            <div className="space-y-4">
                <VersionsListHeader />

                <Suspense fallback={<VersionsListSkeleton />}>
                    <ProdOnly>
                        <VersionsList />
                    </ProdOnly>

                    <DevOnly>
                        <VersionsListSkeleton />
                    </DevOnly>
                </Suspense>
            </div>
        </div>
    );
}
