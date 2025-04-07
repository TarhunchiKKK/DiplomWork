import { Role } from "common/enums";

export type TJwtInfo = {
    id: string;

    email: string;

    role: Role;

    organizationId: string;
};
