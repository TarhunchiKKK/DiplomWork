"use client";

import { useForm } from "react-hook-form";
import { TTotpLoginFormState } from "./types";
import { defaultValues, TOTP_LENGTH } from "./constants";
import { useTotpLogin } from "./hooks";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
    Wrapper
} from "@/shared/ui";

export function TotpLoginForm() {
    const form = useForm<TTotpLoginFormState>({
        defaultValues: defaultValues
    });

    const { login, isPending } = useTotpLogin();

    const onSubmit = (values: TTotpLoginFormState) => {
        login(values.pin);
    };

    return (
        <Wrapper heading="Аутентификация TOTP" description="Введите код, сгенерированный ашим приложением">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        name="pin"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputOTP {...field} maxLength={TOTP_LENGTH}>
                                        <InputOTPGroup className="mx-auto">
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />

                                            <InputOTPSeparator />

                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isPending} className="w-full">
                        Отправить
                    </Button>
                </form>
            </Form>
        </Wrapper>
    );
}
