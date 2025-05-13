import { Button, Tag } from "@/shared/ui";

export const getTagRendereer = (onClick: (email: string) => void) => {
    // eslint-disable-next-line react/display-name
    return (email: string) => {
        return (
            <Tag
                key={email}
                tooltip={
                    <Button variant="default" className="p-0 cursor-pointer" onClick={onClick.bind(null, email)}>
                        Удалить
                    </Button>
                }
            >
                <Button variant="outline">{email}</Button>
            </Tag>
        );
    };
};
