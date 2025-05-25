"use client";

import { CommentsList, CommentsListSkeleton, CreateCommentForm } from "@/widgets/comments";
import { DocumentInfo, DocumentInfoSkeleton } from "@/widgets/documents";
import { VersionsListSkeleton, CreateVersionButton, VersionsList } from "@/widgets/versions";
import { Suspense } from "react";
import { commentsListClassName, versionsListClassName } from "./constants";
import { useDocumentPage } from "./hooks";

export default function DocumentPage() {
    const { documentId, versionId } = useDocumentPage();

    return (
        <div className="flex flex-row justify-between items-start gap-2 h-screen">
            <div className="space-y-8 grow-4 flex flex-col h-full">
                <Suspense fallback={<DocumentInfoSkeleton />}>
                    <DocumentInfo documentId={documentId} />
                </Suspense>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg">Версии документа:</h4>

                        <CreateVersionButton documentId={documentId} />
                    </div>

                    <Suspense fallback={<VersionsListSkeleton className={versionsListClassName} />}>
                        <VersionsList documentId={documentId} className={versionsListClassName} />
                    </Suspense>
                </div>
            </div>

            <div className="grow-3 h-full flex flex-col">
                <Suspense fallback={<CommentsListSkeleton className={commentsListClassName} />}>
                    {versionId && <CommentsList versionId={versionId} className={commentsListClassName} />}
                </Suspense>

                {versionId && <CreateCommentForm versionId={versionId} />}
            </div>
        </div>
    );
}
