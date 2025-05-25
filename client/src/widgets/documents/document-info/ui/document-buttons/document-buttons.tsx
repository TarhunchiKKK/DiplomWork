"use client";

import { Button, Skeleton } from "@/shared/ui";
import { useStartButton, useUrgencyButton } from "./hooks";

export function DocumentButtons() {
    const starButton = useStartButton();

    const urgencyButton = useUrgencyButton();

    return (
        <div className="flex justify-start items-center gap-2">
            <Button variant="outline" size="icon" {...starButton.props}>
                <starButton.icon />
            </Button>

            {urgencyButton.display && (
                <Button variant="outline" size="icon" {...urgencyButton.props}>
                    <urgencyButton.icon />
                </Button>
            )}
        </div>
    );
}

export function DocumentButtonsSkeleton() {
    return (
        <div className="flex justify-start items-center gap-2">
            <Skeleton className="w-9 h-9" />

            <Skeleton className="w-9 h-9" />
        </div>
    );
}
