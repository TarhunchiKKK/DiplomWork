import { Button } from "@/shared/ui";
import { useSignWorkflowButton } from "./hooks";

export function SignWorkflowButton() {
    const buttonProps = useSignWorkflowButton();

    return (
        <Button className="cursor-pointer" {...buttonProps}>
            Подписать
        </Button>
    );
}
