import { Workflow } from "../entities/workflow.entity";

export const transformWorkflow = (workflow: Workflow) => {
    return {
        ...workflow,
        createdAt: workflow.createdAt.toISOString(),
        completedAt: workflow.completedAt.toISOString() ?? null
    };
};

export const transformWorkflowsArray = (workflows: Workflow[]) => {
    return {
        workflows: workflows.map(transformWorkflow)
    };
};
