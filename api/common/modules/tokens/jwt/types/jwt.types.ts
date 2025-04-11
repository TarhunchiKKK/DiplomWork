import { Role } from "common/enums";

export type TJwtInfo = {
    id: string;

    username: string;

    email: string;

    role: Role;

    organizationId: string;
};
