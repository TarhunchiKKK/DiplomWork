export type TMongoEntity<T> = T & {
    _id: string;

    __v: number;
};
