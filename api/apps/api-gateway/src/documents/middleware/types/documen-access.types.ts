export type TCheckPermissionsDto = {
    userId: string;

    document: {
        authorId: string;

        accessToken: string;
    };
};
