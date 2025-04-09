import { TJwtInfo } from "./jwt.types";

export type TAuthenticatedRequest = Request & {
    jwtInfo: TJwtInfo;
};
