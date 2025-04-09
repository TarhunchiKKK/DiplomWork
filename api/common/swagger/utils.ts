import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiProperty } from "@nestjs/swagger";
import { TControllerSwaggerInfo, TEntitySwaggerInfo } from "./types";

export function createControllerApiInfo<T>(swaggerInfo: TControllerSwaggerInfo<T>) {
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

export function createEntityApiInfo<T>(swaggerInfo: TEntitySwaggerInfo<T>) {
    return function () {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return function (constructor: Function) {
            for (const property in swaggerInfo) {
                ApiProperty(swaggerInfo[property])(constructor.prototype, property);
            }
        };
    };
}
