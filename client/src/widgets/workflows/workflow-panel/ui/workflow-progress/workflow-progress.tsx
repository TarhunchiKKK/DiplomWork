import { TagsCloud } from "@/shared/ui";
import { useWorkflowProgress } from "./hooks";
import { TProps } from "./types";
import { renderParticipant } from "./ui";

export function WorkflowProgress({ participants }: TProps) {
    const { displayedParticipants } = useWorkflowProgress(participants);

    return <TagsCloud items={displayedParticipants} renderItem={renderParticipant} />;
}
