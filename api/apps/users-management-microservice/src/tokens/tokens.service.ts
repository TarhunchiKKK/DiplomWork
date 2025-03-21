import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "./entities/token.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokensService {
    public constructor(@InjectRepository(Token) private readonly tokensRepository: Repository<Token>) {}
}
