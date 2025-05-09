import { Button, Tag } from "@/shared/ui";
import { TUpdateItemDto } from "./types";

export const getTagRenderer = (onClick: (item: TUpdateItemDto) => void) => {
    // eslint-disable-next-line react/display-name
    return (data: TUpdateItemDto) => {
        return (
            <Tag
                key={data.value}
                tooltip={
                    <Button variant="default" className="p-0" onClick={onClick.bind(null, data)}>
                        Удалить
                    </Button>
                }
            >
                <Button variant="outline">{data.value}</Button>
            </Tag>
        );
    };
};
