import { Button } from "@/shared/ui";
import { TProps } from "./types";
import { useCreateDivision } from "./hooks";

export function AddDivisionButton({ className }: TProps) {
    const createDivision = useCreateDivision();

    return (
        <Button
            variant="outline"
            size="icon"
            className={"w-12 h-12 text-3xl cursor-pointer " + className}
            onClick={createDivision}
        >
            +
        </Button>
    );
}
