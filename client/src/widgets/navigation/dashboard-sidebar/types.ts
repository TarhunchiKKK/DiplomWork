import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent } from "react";

export type TLink = {
    title: string;

    url: string;

    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
};

export type TGroup = {
    label?: string;

    links: TLink[];
};
