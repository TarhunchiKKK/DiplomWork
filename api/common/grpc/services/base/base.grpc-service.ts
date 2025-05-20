import { InternalServerErrorException, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map } from "rxjs";
import { Observed } from "common/utils";
import { TGrpcClient } from "./types";
import { exceptionsMap } from "./constants";

export class BaseGrpcService<T extends TGrpcClient> implements OnModuleInit {
    protected serviceClient: T;

    public constructor(
        private clientGrpc: ClientGrpc,

        private serviceName: string
    ) {}

    public onModuleInit() {
        this.serviceClient = this.clientGrpc.getService<T>(this.serviceName);
    }

    public call<K extends keyof T>(method: K, arg: T[K] extends (arg: infer P) => any ? P : never) {
        return this.serviceClient[method](arg).pipe(
            map(response => {
                if (response.error) {
                    const Contructor = exceptionsMap.get(response.error.statusCode) ?? InternalServerErrorException;
                    throw new Contructor(response.error.message);
                }

                return response.data as Observed<ReturnType<T[K]>>["data"];
            })
        );
    }
}
