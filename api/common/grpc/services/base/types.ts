import { TGrpcResponse } from "common/grpc";
import { Observable } from "rxjs";

export type TGrpcClient = Record<string, (arg: unknown) => Observable<TGrpcResponse>>;
