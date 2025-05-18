import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { TGroup } from "./types";

export const groups: TGroup[] = [
    {
        label: "Уведомления",
        links: [
            {
                title: "Входящие",
                url: "#",
                icon: Inbox
            }
        ]
    },
    {
        label: "Маршруты",
        links: [
            {
                title: "Мои",
                url: "#",
                icon: Calendar
            },
            {
                title: "Другие",
                url: "#",
                icon: Calendar
            }
        ]
    }
];

export const footerGroup: TGroup = {
    links: [
        {
            title: "Settings",
            url: "#",
            icon: Settings
        }
    ]
};
