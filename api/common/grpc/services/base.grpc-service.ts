import { OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

export class BaseGrpcService<T extends Record<string, (arg: unknown) => Observable<any>>> implements OnModuleInit {
    protected serviceClient: T;

    public constructor(
        private clientGrpc: ClientGrpc,
        private serviceName: string
    ) {}

    public onModuleInit() {
        this.serviceClient = this.clientGrpc.getService<T>(this.serviceName);
    }

    public call<K extends keyof T>(method: K, arg: T[K] extends (arg: infer P) => unknown ? P : never) {
        return this.serviceClient[method](arg) as ReturnType<T[K]>;
    }
}
