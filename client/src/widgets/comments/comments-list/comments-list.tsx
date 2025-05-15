"use client";

import { useCommentsList } from "./hooks";
import { Comment } from "../comment";
import { mocks } from "@/dev";
import { ScrollArea, ScrollBar } from "@/shared/ui";
import { useEffect, useRef } from "react";

const comments = mocks.comments;

export function CommentsList() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current?.scrollIntoView({
            block: "end",
            behavior: "smooth"
        });
    }, []);

    // const { comments } = useCommentsList();

    return (
        <ScrollArea className="h-[400px] rounded-md border">
            <div ref={ref}>{comments?.map(comment => <Comment key={comment.id} comment={comment} />)}</div>

            {/* <ScrollBar /> */}
        </ScrollArea>
    );
}
