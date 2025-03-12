import { ConfigService } from "@nestjs/config";
import { GrpcOptions, Transport } from "@nestjs/microservices";
import { GrpcInfo } from "../grpc";
import { join } from "path";

export function getGrpcConfig(configService: ConfigService, packageName: keyof typeof GrpcInfo): GrpcOptions {
    const grpcInfo = GrpcInfo[packageName];

    return {
        transport: Transport.GRPC,
        options: {
            protoPath: join(__dirname, "../", grpcInfo.protoFile),
            package: grpcInfo.packageName,
            url: configService.getOrThrow<string>(grpcInfo.urlEnvVariable)
        }
    };
}
