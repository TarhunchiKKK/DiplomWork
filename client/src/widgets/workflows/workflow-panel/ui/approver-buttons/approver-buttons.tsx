import { Button } from "@/shared/ui";
import { useApproverButtons } from "./hooks";
import { ApprovalStatus } from "@/entities/workflows";
import { TProps } from "./types";

export function ApproverButtons({ documentId }: TProps) {
    const { isPending, onClick } = useApproverButtons(documentId);

    return (
        <div className="flex flex-col items-center space-y-4">
            <Button
                className="cursor-pointer"
                disabled={isPending}
                onClick={onClick.bind(null, ApprovalStatus.APPROVED)}
            >
                Утвердить
            </Button>

            <Button
                className="cursor-pointer"
                disabled={isPending}
                onClick={onClick.bind(null, ApprovalStatus.REJECTED)}
            >
                Отклонить
            </Button>
        </div>
    );
}
