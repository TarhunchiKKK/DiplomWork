import { TGrpcResponse } from "common/grpc/types";
import { Observable } from "rxjs";

export type TGrpcClient = Record<string, (arg: unknown) => Observable<TGrpcResponse>>;
