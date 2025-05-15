import { CommentsList, CommentsListSkeleton, CreateCommentForm } from "@/widgets/comments";
import { DocumentInfo, DocumentInfoSkeleton } from "@/widgets/document";
import { VersionsList, VersionsListSkeleton, CreateVersionButton } from "@/widgets/versions";
import { Suspense } from "react";

export default function DocumentPage() {
    return (
        <div className="flex flex-row justify-between items-start gap-2 h-screen">
            <div className="space-y-8 grow-4 flex flex-col h-full">
                <Suspense fallback={<DocumentInfoSkeleton />}>
                    <DocumentInfo />
                </Suspense>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg">Версии документа:</h4>

                        <CreateVersionButton />
                    </div>

                    <Suspense fallback={<VersionsListSkeleton className="h-[55%] border" />}>
                        <VersionsList className="h-[55%] border" />
                    </Suspense>
                </div>
            </div>

            <div className="grow-3 h-full flex flex-col">
                <Suspense fallback={<CommentsListSkeleton className="h-[90%] rounded-md border p-2" />}>
                    <CommentsList className="h-[90%] rounded-md border p-2" />
                </Suspense>

                <CreateCommentForm />
            </div>
        </div>
    );
}
