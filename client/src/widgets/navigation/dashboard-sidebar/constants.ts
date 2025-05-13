import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { TGroup } from "./types";

export const groups: TGroup[] = [
    {
        label: "Все",
        links: [
            {
                title: "Home",
                url: "#",
                icon: Home
            },
            {
                title: "Inbox",
                url: "#",
                icon: Inbox
            },
            {
                title: "Calendar",
                url: "#",
                icon: Calendar
            },
            {
                title: "Search",
                url: "#",
                icon: Search
            }
        ]
    },
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
                icon: Search
            },
            {
                title: "Другие",
                url: "#",
                icon: Search
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
