export const fullUpdateDto = [
    {
        title: "Отдел кадров",
        posts: []
    },
    {
        title: "Отдел закупок",
        posts: []
    }
];

export const patchUpdateDto = [
    {
        title: "Отдел маркетинга",
        posts: []
    },
    {
        title: "Отдел продаж",
        posts: []
    },
    {
        title: "Отдел технического обслуживания",
        posts: []
    },
    {
        title: "Отдел финансов",
        posts: []
    }
];

const organizationId = "hbnhkhhjfkuk4535ft5y57";

export const validationErrorTestCases = [
    {
        title: "Test with empty organizationId",
        data: {
            administrativeDivisions: []
        }
    },
    {
        title: "Test with non-string organizationId",
        data: {
            organizationId: 123,
            administrativeDivisions: []
        }
    },
    {
        title: "Test with empty title in administrative division",
        data: {
            organizationId: organizationId,
            administrativeDivisions: [{}]
        }
    },
    {
        title: "Test with non-string title in administrative division",
        data: {
            organizationId: organizationId,
            administrativeDivisions: [
                {
                    title: 123
                }
            ]
        }
    },
    {
        title: "Test with  title in post",
        data: {
            organizationId: organizationId,
            administrativeDivisions: [
                {
                    title: "Some title",
                    posts: [{}]
                }
            ]
        }
    },
    {
        title: "Test with non-string title in post",
        data: {
            organizationId: organizationId,
            administrativeDivisions: [
                {
                    title: "Some title",
                    posts: [
                        {
                            title: 123
                        }
                    ]
                }
            ]
        }
    }
];
