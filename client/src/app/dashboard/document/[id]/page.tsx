import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { CommentsList, CommentsListSkeleton, CreateCommentForm } from "@/widgets/comments";
import { DocumentInfo, DocumentInfoSkeleton } from "@/widgets/documents";
import { VersionsList, VersionsListSkeleton, CreateVersionButton } from "@/widgets/versions";
import { WorkflowParticipantsForm } from "@/widgets/workflows";
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
                        <VersionsList className=" border" />
                    </Suspense>
                </div>
            </div>

            <div className="grow-3 max-w-[580px]  h-[580px] flex flex-col">
                <Tabs defaultValue="1" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="1">Комментарии</TabsTrigger>
                        <TabsTrigger value="2">Маршрут</TabsTrigger>
                    </TabsList>
                    <TabsContent value="1" className="h-[90%] rounded-md border p-2 space-y-2">
                        <Suspense fallback={<CommentsListSkeleton className="h-[90%] rounded-md border p-2" />}>
                            <CommentsList />
                        </Suspense>

                        <CreateCommentForm />
                    </TabsContent>
                    <TabsContent value="2" className="h-[90%] rounded-md border p-2 space-y-2">
                        <WorkflowParticipantsForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
