import { Button } from "@/shared/ui";
import { TProps } from "./types";
import { Plus } from "lucide-react";
import { useDivisionsStore } from "../store";

export function AddDivisionButton({ className }: TProps) {
    const addDivision = useDivisionsStore(state => state.divisions.add);

    return (
        <Button variant="outline" size="icon" className={className} onClick={addDivision}>
            <Plus size={24} />
        </Button>
    );
}
