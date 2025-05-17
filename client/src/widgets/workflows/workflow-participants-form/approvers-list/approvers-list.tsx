import { TagsCloud, TagsCloudSkeleton } from "@/shared/ui";
import { useApproversList } from "./hooks";
import { getTagRenderer } from "./ui";

export function ApproversList() {
    const { approvers, remove } = useApproversList();

    return <TagsCloud items={approvers} renderItem={getTagRenderer(remove)} />;
}

export function ApproversListSkeleton() {
    return <TagsCloudSkeleton />;
}
