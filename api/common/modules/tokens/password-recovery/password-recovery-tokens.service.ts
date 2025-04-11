import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TPasswordRecoveryTokenInfo } from "./types/jwt.types";

@Injectable()
export class PasswordRecoveryTokensService {
    public constructor(private readonly jwtService: JwtService) {}

    public create(dto: TPasswordRecoveryTokenInfo) {
        return this.jwtService.sign({
            id: dto.id,
            email: dto.email,
            password: dto.password
        });
    }

    public verify(token: string) {
        return this.jwtService.verify(token);
    }
}
