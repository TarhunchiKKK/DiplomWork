import { Button, Tag } from "@/shared/ui";
import { TParticipantDto } from "../types";

export const getTagRenderer = (onClick: (userId: string) => void) => {
    // eslint-disable-next-line react/display-name
    return (data: TParticipantDto & { displayName: string }) => {
        return (
            <Tag
                key={data.userId}
                tooltip={
                    <Button variant="default" className="p-0" onClick={onClick.bind(null, data.userId)}>
                        Удалить
                    </Button>
                }
            >
                <Button variant="outline">{data.displayName}</Button>
            </Tag>
        );
    };
};
