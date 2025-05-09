export const routes = {
    dashboard: {
        index: "/dashboard"
    },
    auth: {
        registerAdmin: "/auth/register/admin",
        registerUser: "/auth/register/user",
        login: "/auth/login",
        enableTotp: "/auth/enable-totp"
    },
    settings: {
        documents: "/settings/documents",
        organization: "/settings/organization"
    },
    passwordRecovery: {
        reset: "/password-recovery/reset"
    }
};
