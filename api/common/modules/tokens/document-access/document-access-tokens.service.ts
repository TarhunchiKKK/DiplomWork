import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TDocumentAccessTokenInfo } from "./types/jwt.types";

@Injectable()
export class DocumentAccessTokensService {
    public constructor(private readonly jwtService: JwtService) {}

    public create(dto: TDocumentAccessTokenInfo) {
        return this.jwtService.sign({
            authorId: dto.authorId,
            usersIds: dto.usersIds
        });
    }

    public verify(token: string) {
        return this.jwtService.verify(token) as TDocumentAccessTokenInfo;
    }
}
