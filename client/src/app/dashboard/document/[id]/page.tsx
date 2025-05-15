import { DevOnly, ProdOnly } from "@/dev";
import { DocumentInfo, DocumentInfoSkeleton } from "@/widgets/document";
import { VersionsList, VersionsListSkeleton, CreateVersionButton } from "@/widgets/versions";
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
                <div className="flex justify-between items-center">
                    <h4 className="text-lg">Версии документа:</h4>

                    <ProdOnly>
                        <CreateVersionButton />
                    </ProdOnly>
                </div>

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
