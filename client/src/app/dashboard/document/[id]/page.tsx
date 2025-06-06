"use client";

import { CommentsList, CommentsListSkeleton, CreateCommentForm } from "@/widgets/comments";
import { DocumentInfo, DocumentInfoSkeleton } from "@/widgets/documents";
import { VersionsListSkeleton, CreateVersionButton, VersionsList } from "@/widgets/versions";
import { Suspense } from "react";
import { commentsListClassName, versionsListClassName } from "./constants";
import { useDocumentPage } from "./hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { WorkflowPanel } from "@/widgets/workflows";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Single Document",
    description: "This page allows you to manage document, workflow and comments."
};

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

            <div className="grow-3 max-w-[580px]   max-h-screen flex flex-col">
                <Tabs defaultValue="1" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="1">Комментарии</TabsTrigger>
                        <TabsTrigger value="2">Маршрут</TabsTrigger>
                    </TabsList>
                    <TabsContent value="1" className="rounded-md border p-2 space-y-2">
                        <Suspense fallback={<CommentsListSkeleton className={commentsListClassName} />}>
                            {versionId && <CommentsList versionId={versionId} className={commentsListClassName} />}
                        </Suspense>

                        {versionId && <CreateCommentForm versionId={versionId} />}
                    </TabsContent>
                    <TabsContent value="2" className="h-max rounded-md border p-2 space-y-2">
                        <WorkflowPanel documentId={documentId} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
