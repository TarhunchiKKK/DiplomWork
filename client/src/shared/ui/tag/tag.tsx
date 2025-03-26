import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../generated";
import { TProps } from "./types";

export function Tag({ tooltip, children }: TProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>

                <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
