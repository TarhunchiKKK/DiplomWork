export const routes = {
    dashboard: {
        index: "/dashboard",
        documents: {
            my: "/dashboard/my-documents",
            favourite: "/dashboard/favourite-documents",
            urgent: "/dashboard?isUrgent=true",
            withDocumentAim: (documentAimId: string) => `/dashboard?aimId=${documentAimId}`,
            withDocumentType: (documentTypeId: string) => `/dashboard?typeId=${documentTypeId}`
        },
        notificaions: {
            all: "/dashboard/notifications"
        },
        workflows: {
            my: "/dashboard/workflows/my",
            invited: "/dashboard/workflows/invited"
        },
        settings: {
            profile: "/dashboard/settings/profile",
            users: "/dashboard/settings/users",
            organization: "/dashboard/settings/organization",
            documents: "/dashboard/settings/documents"
        }
    },
    auth: {
        registerAdmin: "/auth/register/admin",
        registerUser: "/auth/register/user",
        login: "/auth/login",
        enableTotp: "/auth/enable-totp"
    },
    settings: {
        documents: "/settings/documents",
        organization: "/settings/organization",
        users: "/settings/users",
        profile: "/settings/profile"
    },
    passwordRecovery: {
        reset: "/password-recovery/reset"
    }
};
