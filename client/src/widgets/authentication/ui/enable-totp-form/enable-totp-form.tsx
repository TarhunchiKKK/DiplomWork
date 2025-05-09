"use client";

import { useForm } from "react-hook-form";
import { defaultValues, TOTP_LENGTH } from "./constants";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormWrapper,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "@/shared/ui";
import { TEnableTotpFormState, TProps } from "./types";
import { useEnableTotp } from "./hooks";

export function EnableTotpForm(props: TProps) {
    const form = useForm<TEnableTotpFormState>({
        defaultValues: defaultValues
    });

    const { enable, isPending } = useEnableTotp(props);

    const onSubmit = (values: TEnableTotpFormState) => {
        enable(values.pin);
    };

    return (
        <FormWrapper heading="Активация TOTP" description="Введите код, сгенерированный вашим приложением.">
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
        </FormWrapper>
    );
}
