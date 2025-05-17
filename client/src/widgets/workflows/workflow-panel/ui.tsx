import { Button, Tag } from "@/shared/ui";
import { TItem } from "./types";
import { ApprovalStatus } from "@/entities/workflows/approvals";

const classNamesMap: Record<ApprovalStatus, string> = {
    [ApprovalStatus.APPROVED]: "bg-green-400",
    [ApprovalStatus.REJECTED]: "bg-red-300",
    [ApprovalStatus.DEFAULT]: ""
};

export const renderParticipant = (data: TItem) => {
    return (
        <Tag key={data.id} tooltip={null}>
            <Button variant="outline" className={classNamesMap[data.status]}>
                {data.displayName}
            </Button>
        </Tag>
    );
};
