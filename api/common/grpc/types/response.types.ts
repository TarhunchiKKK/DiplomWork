import { IHttpError } from "../generated";

export type TGrpcResponse<T = unknown> = {
    data?: T;

    error?: IHttpError;
};
