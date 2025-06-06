"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px]">
            <CardHeader>
                <CardTitle className="text-center text-4xl">404</CardTitle>

                <CardDescription className="text-center">
                    Данный ресурс не найден. Возможно, он не существует или удален.
                </CardDescription>
            </CardHeader>

            <CardFooter>
                <Button className="mx-auto" onClick={router.back}>
                    Назад
                </Button>
            </CardFooter>
        </Card>
    );
}
