"use client";

import { Button, FormWrapper } from "@/shared/ui";
import { useResetPassword } from "./hooks";
import { routes } from "@/shared/routing";

export function ResetPasswordForm() {
    const { reset, isPending } = useResetPassword();

    const handleClick = () => {
        reset();
    };

    return (
        <FormWrapper
            heading="Сброс пароля"
            description="Нажмите кнопку ниже для сброса пароля, после чего на ваш email будет отправлено письмо с инструкцией."
            backButtonLabel="Вернуться назад"
            backButtonHref={routes.dashboard.index}
        >
            <Button disabled={isPending} className="w-full" onClick={handleClick}>
                Сбросить пароль
            </Button>
        </FormWrapper>
    );
}
