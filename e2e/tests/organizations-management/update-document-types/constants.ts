export const fullUpdateDto = [
    {
        value: "Страховая"
    },
    {
        value: "Налоговая"
    }
];

export const patchUpdateDto = [
    {
        value: "Доверенность"
    },
    {
        value: "Накладная"
    },
    {
        value: "Налоговая"
    },
    {
        value: "Страховая"
    },
    {
        value: "Страховая 2"
    }
];

const organizationId = "hbnhkhhjfkuk4535ft5y57";

export const validationErrorTestCases = [
    {
        title: "Test with empty organizationId",
        data: {
            documentTypes: []
        }
    },
    {
        title: "Test with non-string organizationId",
        data: {
            organizationId: 123,
            documentTypes: []
        }
    },
    {
        title: "Test with empty value in document type",
        data: {
            organizationId: organizationId,
            documentTypes: [{}]
        }
    },
    {
        title: "Test with non-string value in document type",
        data: {
            organizationId: organizationId,
            documentTypes: [
                {
                    value: 123
                }
            ]
        }
    }
];
