import { Role } from "common/enums";

export class GenerateJwtDto {
    id: string;

    email: string;

    role: Role;

    organizationId: string;
}
