import { Button } from "@/shared/ui";
import { useSignWorkflowButton } from "./hooks";
import { TProps } from "./types";

export function SignWorkflowButton({ documentId }: TProps) {
    const buttonProps = useSignWorkflowButton(documentId);

    return (
        <Button className="cursor-pointer" {...buttonProps}>
            Подписать
        </Button>
    );
}
