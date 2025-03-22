export const fullUpdateDto = [
    {
        value: "На рассмотрение"
    },
    {
        value: "На увольнение"
    }
];

export const patchUpdateDto = [
    {
        value: "На 1"
    },
    {
        value: "На 2"
    },
    {
        value: "На 3"
    },
    {
        value: "На 4"
    },
    {
        value: "На 5"
    }
];

const organizationId = "hbnhkhhjfkuk4535ft5y57";

export const validationErrorTestCases = [
    {
        title: "Test with empty organizationId",
        data: {
            documentAims: []
        }
    },
    {
        title: "Test with non-string organizationId",
        data: {
            organizationId: 123,
            documentAims: []
        }
    },
    {
        title: "Test with empty value in document aim",
        data: {
            organizationId: organizationId,
            documentAims: [{}]
        }
    },
    {
        title: "Test with non string value in document aim",
        data: {
            organizationId: organizationId,
            documentAims: [
                {
                    value: 123
                }
            ]
        }
    }
];
