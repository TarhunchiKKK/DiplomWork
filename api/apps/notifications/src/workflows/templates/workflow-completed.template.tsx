import * as React from "react";
import { Body, Head, Heading, Preview, Section, Tailwind, Text } from "@react-email/components";
import { Html } from "@react-email/html";

type TProps = {
    workflowTitle: string;
};

export function WorkflowCompletedTemplate({ workflowTitle }: TProps) {
    return (
        <Html>
            <Head />

            <Preview>Маршрут согласования завершен</Preview>

            <Tailwind>
                <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
                    <Section className="text-center mb-8">
                        <Heading className="text-3xl text-black font-bold">Маршрут {`"${workflowTitle}"`}</Heading>
                    </Section>

                    <Section className="text-center mb-8">
                        <Text className="text-gray-600">
                            Маршрут {`"${workflowTitle}"`} завершен. Все участники подтвердили/подписали документ.
                        </Text>
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
