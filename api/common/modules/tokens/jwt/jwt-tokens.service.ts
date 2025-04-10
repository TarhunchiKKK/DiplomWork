import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TJwtInfo } from "./types/jwt.types";

@Injectable()
export class JwtTokensService {
    public constructor(private readonly jwtService: JwtService) {}

    public create(dto: TJwtInfo) {
        return this.jwtService.sign({
            id: dto.id,
            email: dto.email,
            role: dto.role,
            organizationId: dto.organizationId
        });
    }

    public verify(token: string) {
        return this.jwtService.verify(token);
    }
}
