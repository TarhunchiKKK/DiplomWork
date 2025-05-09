import { Button, Skeleton, Tag, TagsCloud } from "@/shared/ui";

export const getActiveUserTagRenderer = (onClick: (userId: string) => void) => {
    // eslint-disable-next-line react/display-name
    return (user: { id: string; email: string }) => {
        return (
            <Tag
                key={user.id}
                tooltip={
                    <Button variant="default" className="p-0 cursor-pointer" onClick={onClick.bind(null, user.id)}>
                        Деактивировать
                    </Button>
                }
            >
                <Button variant="outline" className="bg-green-600!">
                    {user.email}
                </Button>
            </Tag>
        );
    };
};

export const getDeactivatedUserTagRenderer = (onClick: (userId: string) => void) => {
    // eslint-disable-next-line react/display-name
    return (user: { id: string; email: string }) => {
        return (
            <Tag
                key={user.id}
                tooltip={
                    <Button variant="default" className="p-0 cursor-pointer" onClick={onClick.bind(null, user.id)}>
                        Активировать
                    </Button>
                }
            >
                <Button variant="outline" className="bg-red-400!">
                    {user.email}
                </Button>
            </Tag>
        );
    };
};

export function UsersManagementPanelSkeleton() {
    "use client";

    return (
        <div className="flex justify-between items-center gap-4 h-[104px]">
            <TagsCloud items={new Array(12).fill("")} renderItem={() => <Skeleton className="w-32 h-6 rounded-sm" />} />

            <TagsCloud items={new Array(12).fill("")} renderItem={() => <Skeleton className="w-32 h-6 rounded-sm" />} />
        </div>
    );
}
