export type TUpdatePostDto = {
    _id?: string;

    title: string;
};

export type TUpdateItemDto = {
    _id?: string;

    title: string;

    posts: TUpdatePostDto[];
};

export type TUpdateDto = {
    organizationId: string;

    administrativeDivisions: TUpdateItemDto[];
};

export type TSingleDivisionState = {
    title: string;

    posts: TUpdatePostDto[];
};
