"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui";
import { TProps } from "./types";

export function ProfileSettingsWrapper({ title, description, children }: TProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>

                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>

            <CardContent>{children}</CardContent>
        </Card>
    );
}
