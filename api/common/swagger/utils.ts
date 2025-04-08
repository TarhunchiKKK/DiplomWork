import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiProperty, ApiPropertyOptions } from "@nestjs/swagger";
import { TControllerSwaggerInfo } from "./types";

export function createControllerApiInfo(swaggerInfo: TControllerSwaggerInfo) {
    return function () {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return function (constructor: Function) {
            ApiTags(swaggerInfo.tags)(constructor);

            for (const method in swaggerInfo.methods) {
                const descriptor: unknown = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);

                if (swaggerInfo.methods[method].bearerAuth) {
                    ApiBearerAuth()(constructor.prototype[method], method, descriptor);
                }

                ApiOperation(swaggerInfo.methods[method].operation)(constructor.prototype[method], method, descriptor);
                ApiResponse(swaggerInfo.methods[method].response)(constructor.prototype[method], method, descriptor);
            }
        };
    };
}

export function createEntityApiInfo<T>(swaggerInfo: Record<keyof T, ApiPropertyOptions>) {
    return function () {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return function (constructor: Function) {
            for (const property in swaggerInfo) {
                ApiProperty(swaggerInfo[property])(constructor.prototype, property);
            }
        };
    };
}
