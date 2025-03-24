import { Reflector } from "@nestjs/core";
import { Role } from "common/enums";

export const RequireRoles = Reflector.createDecorator<Role[]>();
