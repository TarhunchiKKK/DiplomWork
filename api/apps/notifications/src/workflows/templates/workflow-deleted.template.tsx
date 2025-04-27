import * as React from "react";
import { Body, Head, Heading, Preview, Section, Tailwind, Text } from "@react-email/components";
import { Html } from "@react-email/html";

type TProps = {
    documentTitle: string;
};

export function WorkflowDeletedTemplate({ documentTitle }: TProps) {
    return (
        <Html>
            <Head />

            <Preview>Маршрут согласования удален</Preview>

            <Tailwind>
                <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
                    <Section className="text-center mb-8">
                        <Heading className="text-3xl text-black font-bold">Документ {`"${documentTitle}"`}</Heading>
                    </Section>

                    <Section className="text-center mb-8">
                        <Text className="text-gray-600">
                            Вы были исключены из маршрута согласования документа {`"${documentTitle}"`} т.к. даннй
                            маршрут был удалён.
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
