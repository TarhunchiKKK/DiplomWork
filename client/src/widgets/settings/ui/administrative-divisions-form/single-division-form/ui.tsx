import { Button, Tag } from "@/shared/ui";
import { TWithTempId } from "@/widgets/settings/helpers";
import { TUpdatePostDto } from "../types";

export const getTagRenderer = (onClick: (tempId: string) => void) => {
    // eslint-disable-next-line react/display-name
    return (data: TWithTempId<TUpdatePostDto>) => {
        return (
            <Tag
                key={data.tempId}
                tooltip={
                    <Button variant="default" className="p-0" onClick={onClick.bind(null, data.tempId)}>
                        Удалить
                    </Button>
                }
            >
                <Button variant="outline">{data.title}</Button>
            </Tag>
        );
    };
};
