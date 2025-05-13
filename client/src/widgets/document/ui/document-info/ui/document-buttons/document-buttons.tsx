import { Button } from "@/shared/ui";
import { TProps } from "./types";
import { Star, Timer, Trash } from "lucide-react";

export function DocumentButtons({ documentId }: TProps) {
    return (
        <div className="flex justify-start items-center gap-2">
            <Button variant="outline" size="icon">
                <Star />
            </Button>

            <Button variant="outline" size="icon">
                <Timer />
            </Button>

            <Button variant="outline" size="icon">
                <Trash />
            </Button>
        </div>
    );
}
