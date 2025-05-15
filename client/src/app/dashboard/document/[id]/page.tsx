import { DevOnly, ProdOnly } from "@/dev";
import { CommentsList, CommentsListSkeleton } from "@/widgets/comments";
import { DocumentInfo, DocumentInfoSkeleton } from "@/widgets/document";
import { VersionsList, VersionsListSkeleton, CreateVersionButton } from "@/widgets/versions";
import { Suspense } from "react";

export default function DocumentPage() {
    return (
        <div className="flex flex-row justify-between items-start gap-2">
            <div className="space-y-8 grow-4 flex flex-col h-screen">
                <Suspense fallback={<DocumentInfoSkeleton />}>
                    <ProdOnly>
                        <DocumentInfo />
                    </ProdOnly>

                    <DevOnly>
                        <DocumentInfoSkeleton />
                    </DevOnly>
                </Suspense>

                <div className="space-y-4 grow-1">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg">Версии документа:</h4>

                        <ProdOnly>
                            <CreateVersionButton />
                        </ProdOnly>
                    </div>

                    <Suspense fallback={<VersionsListSkeleton className="h-[500px] border" />}>
                        <ProdOnly>
                            <VersionsList className="h-[500px] border" />
                        </ProdOnly>

                        <DevOnly>
                            <VersionsListSkeleton className="h-[500px] border" />
                        </DevOnly>
                    </Suspense>
                </div>
            </div>

            <div className="grow-3 h-screen">
                <Suspense fallback={<CommentsListSkeleton className="h-[400px] rounded-md border p-2" />}>
                    <ProdOnly>
                        <CommentsList className="h-[400px] rounded-md border p-2" />
                    </ProdOnly>

                    <DevOnly>
                        <CommentsListSkeleton className="h-full rounded-md border p-2" />
                    </DevOnly>
                </Suspense>
            </div>
        </div>
    );
}
