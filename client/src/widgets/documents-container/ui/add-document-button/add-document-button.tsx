import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

export function AddDocumentButton() {
    const handleClick = () => {
        redirect("#");
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="cursor-pointer" onClick={handleClick}>
                        <Plus />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>Создать</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
