import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "./entities/token.entity";
import { Repository } from "typeorm";
import { TokenType } from "./enums/token-type.enum";
import { AddDocumentAccessTokenDto } from "./dto/add-document-access-token.dto";
import { expirationTimes } from "./constants/expiration-time.constants";
import { DeleteDocumentAccessTokenDto } from "common/grpc";

@Injectable()
export class TokensService {
    public constructor(@InjectRepository(Token) private readonly tokensRepository: Repository<Token>) {}

    public async addDocumentAccessToken(dto: AddDocumentAccessTokenDto) {
        const existingToken = await this.tokensRepository.findOne({
            where: {
                user: {
                    id: dto.userId
                },
                token: dto.token
            },
            relations: {
                user: true
            }
        });

        if (existingToken) {
            return existingToken;
        }

        return await this.tokensRepository.create({
            token: dto.token,
            type: TokenType.DOCUMENT_ACCESS,
            expiresAt: new Date(Date.now() + expirationTimes[TokenType.DOCUMENT_ACCESS]),
            user: {
                id: dto.userId
            }
        });
    }

    public async deleteDocumentAccessToken(dto: DeleteDocumentAccessTokenDto) {
        const token = await this.tokensRepository.findOne({
            where: {
                user: {
                    id: dto.userId
                },
                token: dto.token
            },
            relations: {
                user: true
            }
        });

        if (token) {
            await this.tokensRepository.remove(token);
        }
    }
}
