import { Role } from "common/enums";

export class CreateUserDto {
    username: string;

    email: string;

    password: string;

    role: Role;

    organizationId: string;
}
