"use client";

import { Button } from "@/shared/ui";
import { Star, Timer } from "lucide-react";
import { useStartButton, useUrgencyButton } from "./hooks";

export function DocumentButtons() {
    const starButton = useStartButton();

    const urgencyButton = useUrgencyButton();

    return (
        <div className="flex justify-start items-center gap-2">
            <Button variant="outline" size="icon" disabled={starButton.disabled} onClick={starButton.onClick}>
                <Star />
            </Button>

            <Button variant="outline" size="icon" disabled={urgencyButton.disabled} onClick={urgencyButton.onClick}>
                <Timer />
            </Button>
        </div>
    );
}
