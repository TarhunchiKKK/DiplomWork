import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

@Injectable()
export class RedisService extends Redis {
    public constructor(private readonly configService: ConfigService) {
        super({
            port: configService.getOrThrow<number>("REDIS_PORT"),
            host: configService.getOrThrow<string>("REDIS_HOST"),
            password: configService.getOrThrow<string>("REDIS_PASSWORD")
        });
    }
}
