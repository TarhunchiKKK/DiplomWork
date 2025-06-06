import { Workflow, WorkflowSkeleton } from "../workflow";
import { TProps } from "./types";

export function WorkflowsList({ workflows }: TProps) {
    return (
        <div className="space-y-2">
            {workflows.map(workflow => (
                <Workflow key={workflow.id} workflow={workflow} />
            ))}
        </div>
    );
}

export function WorkflowsListSkeleton() {
    return (
        <div className="space-y-2">
            {new Array(12).fill(null).map((_, index) => (
                <WorkflowSkeleton key={index} />
            ))}
        </div>
    );
}
