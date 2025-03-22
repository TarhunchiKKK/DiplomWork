export const dto = {
    urgencyInterval: 123
};

const organizationId = "hbnhkhhjfkuk4535ft5y57";

export const validationErrorTestCases = [
    {
        title: "Test with empty organizationId",
        data: {
            urgencyInterval: dto.urgencyInterval
        }
    },
    {
        title: "Test with non-string organizationId",
        data: {
            organizationId: 123,
            urgencyInterval: dto.urgencyInterval
        }
    },
    {
        title: "Test with empty urgencyInterval",
        data: {
            organizationId: organizationId
        }
    },
    {
        title: "Test with non-number urgencyInterval",
        data: {
            organizationId: organizationId,
            urgencyInterval: "abc"
        }
    }
];
