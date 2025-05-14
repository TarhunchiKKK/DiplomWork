"use client";

import { Button } from "@/shared/ui";
import { Plus } from "lucide-react";
import { useButton } from "./hooks";

export function VersionsListHeader() {
    const { display } = useButton();

    return (
        <div className="flex justify-between items-center">
            <h4 className="text-lg">Версии документа:</h4>

            {display && (
                <Button variant="outline" size="icon" className="cursor-pointer" title="Создать">
                    <Plus />
                </Button>
            )}
        </div>
    );
}
