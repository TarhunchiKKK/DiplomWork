import { Inbox, Settings, User, LucideUsers } from "lucide-react";
import { TGroup } from "./types";
import { routes } from "@/shared/routing";

export const notificationsGroup: TGroup = {
    label: "Уведомления",
    links: [
        {
            title: "Входящие",
            url: routes.dashboard.notificaions.all,
            icon: Inbox
        }
    ]
};

export const workflowsGroup: TGroup = {
    label: "Маршруты",
    links: [
        {
            title: "Мои",
            url: routes.dashboard.workflows.my,
            icon: User
        },
        {
            title: "С моим участием",
            url: routes.dashboard.workflows.invited,
            icon: LucideUsers
        }
    ]
};

export const footerGroup: TGroup = {
    links: [
        {
            title: "Настройки",
            url: routes.settings.profile,
            icon: Settings
        }
    ]
};
