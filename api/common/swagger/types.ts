import { ApiOperationOptions, ApiPropertyOptions, ApiResponseOptions } from "@nestjs/swagger";

export type TControllerSwaggerInfo<TController> = {
    tags: string;

    methods: Record<keyof TController, TMethodInfo>;
};

type TMethodInfo = {
    operation: ApiOperationOptions;

    response: ApiResponseOptions;

    bearerAuth?: boolean;
};

export type TEntitySwaggerInfo<T> = Record<keyof T, ApiPropertyOptions>;
