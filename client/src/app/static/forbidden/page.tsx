"use client";

import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
    const router = useRouter();

    return (
        <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px]">
            <CardHeader>
                <CardTitle className="text-center text-4xl">403</CardTitle>

                <CardDescription className="text-center">У вас нет прав на доступ к этому ресурсу.</CardDescription>
            </CardHeader>

            <CardFooter>
                <Button className="mx-auto" onClick={router.back}>
                    Назад
                </Button>
            </CardFooter>
        </Card>
    );
}
