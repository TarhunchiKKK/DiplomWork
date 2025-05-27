"use client";

import { Comment, CommentSkeleton } from "../comment";
import { ScrollArea, ScrollBar } from "@/shared/ui";
import { useEffect, useRef } from "react";
import { TProps, TSkeletonProps } from "./types";
import { useDocumentComments } from "@/entities/documents";

export function CommentsList({ versionId, className }: TProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current?.scrollIntoView({
            block: "end",
            behavior: "smooth"
        });
    }, []);

    const { data: comments } = useDocumentComments(versionId);

    return (
        <>
            {comments?.length !== 0 && (
                <ScrollArea className={className}>
                    <div ref={ref} className="space-y-4">
                        {comments?.map(comment => <Comment key={comment.id} comment={comment} />)}
                    </div>

                    <ScrollBar />
                </ScrollArea>
            )}

            {comments?.length === 0 && <p className="text-center">Комментариев пока нет</p>}
        </>
    );
}

export function CommentsListSkeleton({ className }: TSkeletonProps) {
    return (
        <ScrollArea className={className}>
            <div className="space-y-4">
                {new Array(12).fill("").map((_, index) => (
                    <CommentSkeleton key={index} />
                ))}
            </div>

            <ScrollBar />
        </ScrollArea>
    );
}
