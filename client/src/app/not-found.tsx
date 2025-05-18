import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui";

export default function NotFound() {
    return (
        <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px]">
            <CardHeader>
                <CardTitle className="text-center">Страница не найдена</CardTitle>

                <CardDescription className="text-center">
                    Данный ресурс не найден. Возможно, он не существует или удален.
                </CardDescription>
            </CardHeader>

            <CardFooter>
                <Button className="mx-auto">Назад</Button>
            </CardFooter>
        </Card>
    );
}
