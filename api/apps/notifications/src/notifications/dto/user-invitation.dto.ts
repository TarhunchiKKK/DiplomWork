import { IUserInvitationDto } from "common/grpc";

export class UserInvitationDto implements IUserInvitationDto {
    from: string;

    to: string;

    token: string;
}
