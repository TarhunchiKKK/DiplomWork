import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { TProps } from "./types";
import { DivisionPostsForm, DivisionTitleForm } from "./ui";

export function SingleDivisionForm({ index }: TProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <DivisionTitleForm index={index} />
                </CardTitle>
            </CardHeader>

            <CardContent>
                <DivisionPostsForm index={index} />
            </CardContent>
        </Card>
    );
}
