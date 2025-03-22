const validUsername = "username";
const validEmail = "test@gmail.com";
const validPassword = "password123!";

export const invalidTestCases = [
    {
        title: "Test with empty username",
        dto: {
            email: validEmail,
            password: validPassword
        }
    },
    {
        title: "Test with numeric username",
        dto: {
            username: 123,
            email: validEmail,
            password: validPassword
        }
    },
    {
        title: "Test with empty email",
        dto: {
            username: validUsername,
            password: validPassword
        }
    },
    {
        title: "Test with incorrect email format",
        dto: {
            username: validUsername,
            email: "incorrectgmail.com",
            password: validPassword
        }
    },
    {
        title: "Test with empty password",
        dto: {
            username: validUsername,
            email: validEmail
        }
    },
    {
        title: "Test with numeric password",
        dto: {
            username: validUsername,
            email: validEmail,
            password: 123
        }
    },
    {
        title: "Test with short password",
        dto: {
            username: validUsername,
            email: validEmail,
            password: "short"
        }
    },
    {
        title: "Test with long password",
        dto: {
            username: validUsername,
            email: validEmail,
            password:
                "long_password_long_password_long_password_long_password_long_password_long_password_long_password_long_password"
        }
    },
    {
        title: "Test with password without special characters",
        dto: {
            username: validUsername,
            email: validEmail,
            password: "some_password"
        }
    },
    {
        title: "Test with undefined dto"
    },
    {
        title: "Test with incorrect dto format",
        dto: "incorrect_format"
    },
    {
        title: "Test with all empty fields",
        dto: {}
    },
    {
        title: "Test with all invalid fields",
        dto: {
            username: 123,
            email: "email",
            password: "password"
        }
    }
];
