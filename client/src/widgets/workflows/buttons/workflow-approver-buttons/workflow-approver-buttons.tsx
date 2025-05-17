import { Button } from "@/shared/ui";
import { useApproverButtons } from "./hooks";
import { ApprovalStatus } from "@/entities/workflows";

export function WorkflowApproverButtons() {
    const { isPending, onClick } = useApproverButtons();

    return (
        <div className="w-[400px] space-y-4">
            <Button
                className="cursor-pointer w-full"
                disabled={isPending}
                onClick={onClick.bind(null, ApprovalStatus.APPROVED)}
            >
                Утвердить
            </Button>

            <Button
                className="cursor-pointer w-full"
                disabled={isPending}
                onClick={onClick.bind(null, ApprovalStatus.REJECTED)}
            >
                Отклонить
            </Button>
        </div>
    );
}
