import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../generated";
import { TTagProps } from "./types";

export function Tag({ tooltip, children }: TTagProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>

                {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
            </Tooltip>
        </TooltipProvider>
    );
}
