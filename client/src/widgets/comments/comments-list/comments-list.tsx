"use client";

import { useCommentsList } from "./hooks";
import { Comment, CommentSkeleton } from "../comment";
import { ScrollArea, ScrollBar } from "@/shared/ui";
import { useEffect, useRef } from "react";
import { TProps } from "./types";

export function CommentsList({ className }: TProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current?.scrollIntoView({
            block: "end",
            behavior: "smooth"
        });
    }, []);

    const { comments } = useCommentsList();

    return (
        <ScrollArea className={className}>
            <div ref={ref} className="space-y-4">
                {comments?.map(comment => <Comment key={comment.id} comment={comment} />)}
            </div>

            <ScrollBar />
        </ScrollArea>
    );
}

export function CommentsListSkeleton({ className }: TProps) {
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
