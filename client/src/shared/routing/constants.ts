export const routes = {
    dashboard: {
        index: "/dashboard",
        matcher: "/dashboard/*",
        documents: {
            my: "/dashboard/my-documents",
            favourite: "/dashboard/favourite-documents",
            urgent: "/dashboard?isUrgent=true",
            withDocumentAim: (documentAimId: string) => `/dashboard?aimId=${documentAimId}`,
            withDocumentType: (documentTypeId: string) => `/dashboard?typeId=${documentTypeId}`,
            one: (documentId: string) => `/dashboard/document/${documentId}`
        },
        notificaions: {
            all: "/dashboard/notifications"
        },
        workflows: {
            my: "/dashboard/workflows/my",
            invited: "/dashboard/workflows/invited"
        }
    },
    settings: {
        matcher: "/settings/*",
        documents: "/settings/documents",
        organization: "/settings/organization",
        users: "/settings/users",
        profile: "/settings/profile"
    },
    auth: {
        registerAdmin: "/auth/register/admin",
        registerUser: "/auth/register/user",
        login: "/auth/login",
        enableTotp: "/auth/enable-totp"
    },
    passwordRecovery: {
        matcher: "/password-recovery/*",
        reset: "/password-recovery/reset"
    }
};
