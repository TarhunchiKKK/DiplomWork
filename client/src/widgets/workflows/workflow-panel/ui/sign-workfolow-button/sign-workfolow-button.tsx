import { Button, CenteredChild, CenteredChildParent } from "@/shared/ui";
import { TProps } from "./types";
import { useSignWorkflow } from "@/entities/workflows";

export function SignWorkflowButton({ workflowId }: TProps) {
    const { mutate: signWorkflow, isPending } = useSignWorkflow();

    const onClick = () => {
        signWorkflow(workflowId);
    };

    return (
        <CenteredChildParent>
            <CenteredChild>
                <Button className="cursor-pointer" disabled={isPending} onClick={onClick}>
                    Подписать
                </Button>
            </CenteredChild>
        </CenteredChildParent>
    );
}
