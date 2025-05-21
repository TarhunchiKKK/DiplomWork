import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { TProps } from "./types";
import { DivisionPostsForm, DivisionTitleForm, TrashButton } from "./ui";

export function SingleDivisionForm({ index }: TProps) {
    return (
        <Card className="w-ful relative">
            <CardHeader>
                <CardTitle>
                    <DivisionTitleForm index={index} />
                </CardTitle>
            </CardHeader>

            <CardContent>
                <DivisionPostsForm index={index} />
            </CardContent>

            <TrashButton index={index} className="absolute top-3 right-3" />
        </Card>
    );
}
