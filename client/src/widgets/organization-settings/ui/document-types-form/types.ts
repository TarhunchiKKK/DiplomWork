export type TUpdateItemDto = {
    _id?: string;

    value: string;
};

export type TUpdateDto = {
    organizationId: string;

    documentTypes: TUpdateItemDto[];
};

export type TFormState = {
    value: string;
};
