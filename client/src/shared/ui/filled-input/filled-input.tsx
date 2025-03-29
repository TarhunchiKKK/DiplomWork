import { cn } from "@/shared/utils";
import { TProps } from "./types";

export function FilledInput({ className, ...props }: TProps) {
    return (
        <input
            {...props}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-transparent selection:text-primary-foreground dark:bg-transparent border-input flex h-9 w-full min-w-0 border-b-0 bg-transparent px-3 py-1 text-base transition-[color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus:border-b focus-visible:border-b focus-visible:border-ring focus-visible:ring-ring/50",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
            )}
        />
    );
}
