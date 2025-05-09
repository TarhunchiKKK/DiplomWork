export type TUpdateItemDto = {
    _id?: string;

    value: string;
};

export type TUpdateDto = {
    organizationId: string;

    documentAims: TUpdateItemDto[];
};

export type TFormState = {
    value: string;
};
