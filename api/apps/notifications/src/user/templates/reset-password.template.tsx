import * as React from "react";
import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import { Html } from "@react-email/html";

type TProps = {
    domain: string;

    token: string;
};

export function ResetPasswordTemplate({ domain, token }: TProps) {
    const verificationLink = `${domain}/auth/new-verification?token=${token}`;

    return (
        <Html>
            <Head />

            <Preview>Сброс пароля</Preview>

            <Tailwind>
                <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
                    <Section className="text-center mb-8">
                        <Heading className="text-3xl text-black font-bold">Подтверждение сброса пароля</Heading>
                    </Section>

                    <Section className="text-center mb-8">
                        <Heading className="text-3xl text-black font-bold">
                            Измменить пароль можно по ссылке ниже:
                        </Heading>

                        <Link
                            href={verificationLink}
                            className="inline-flex justify-center items-center rounded-full text-sm font-medium text-white bg-[#18B9AE] px-5 py-2"
                        >
                            Присоединиться
                        </Link>
                    </Section>

                    <Section className="text-center mt-8">
                        <Text className="text-gray-600">
                            С уважением, команда <b>E-Doc-Hub</b>.
                        </Text>
                    </Section>
                </Body>
            </Tailwind>
        </Html>
    );
}
