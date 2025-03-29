import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui";
import { TProps } from "./types";
import Link from "next/link";

export function Wrapper({ heading, description, backButtonLabel, backButtonHref, children }: TProps) {
    return (
        <Card className="w-[300px] sm:w-[400px]">
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl">{heading}</CardTitle>

                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>

            <CardContent>{children}</CardContent>

            <CardFooter>
                {backButtonLabel && backButtonHref && (
                    <Button variant="link" className="w-full font-normal">
                        <Link href={backButtonHref}>{backButtonLabel}</Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
