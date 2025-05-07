import { Button, Tag } from "@/shared/ui";
import { TWithTempId } from "../../helpers";
import { TUpdateItemDto } from "./types";

export const getTagRenderer = (onClick: (tempId: string) => void) => {
    // eslint-disable-next-line react/display-name
    return (data: TWithTempId<TUpdateItemDto>) => {
        return (
            <Tag
                key={data.tempId}
                tooltip={
                    <Button variant="default" className="p-0" onClick={() => onClick(data.tempId)}>
                        Удалить
                    </Button>
                }
            >
                <Button variant="outline">{data.value}</Button>
            </Tag>
        );
    };
};
