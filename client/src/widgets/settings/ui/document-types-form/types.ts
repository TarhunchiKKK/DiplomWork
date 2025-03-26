export type TUpdateItemDto = {
    _id?: string;

    value: string;
};

export type TUpdateDto = {
    organizationId: string;

    documentTypes: TUpdateItemDto[];
};

export type TformState = {
    value: string;
};
