import { Injectable } from "@nestjs/common";
import { AuthResponse, RegisterAdminDto } from "common/grpc";

@Injectable()
export class AuthenticationService {
    public registerAdmin(dto: RegisterAdminDto): AuthResponse {
        return {
            profile: {
                ...dto,
                id: "",
                post: "post",
                isDeactivated: false,
                isTwoFactorEnabled: false,
                role: "role"
            },
            token: "token"
        };
    }
}
