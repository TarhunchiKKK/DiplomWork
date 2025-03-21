import { OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";

export class BaseGrpcService<TClient extends object> implements OnModuleInit {
    protected serviceClient: TClient;

    public constructor(
        private clientGrpc: ClientGrpc,
        private serviceName: string
    ) {}

    public onModuleInit() {
        this.serviceClient = this.clientGrpc.getService<TClient>(this.serviceName);
    }
}
