import { createControllerApiInfo } from "common/swagger";

export const AuthenticationControllerApi = createControllerApiInfo({
    tags: "Authentication",

    methods: {
        registerAdmin: {
            operation: {
                summary: "Admin Registration"
            },
            response: {
                status: 200,
                description: "Creates user with ADMIN role"
            }
        }
    }
});
