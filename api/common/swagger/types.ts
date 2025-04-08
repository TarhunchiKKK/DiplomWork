import { ApiOperationOptions, ApiPropertyOptions, ApiResponseOptions } from "@nestjs/swagger";

export type TControllerSwaggerInfo = {
    tags: string;

    methods: Record<string, TMethodInfo>;
};

type TMethodInfo = {
    operation: ApiOperationOptions;

    response: ApiResponseOptions;

    bearerAuth?: boolean;
};

export type TDtoSwaggerInfo = Record<string, ApiPropertyOptions>;
