import { createControllerApiInfo, swaggerExampleValues } from "common/swagger";
import { InvitationsController } from "../invitations.controller";
import { HttpStatus } from "@nestjs/common";

export const InvitatiosnControllerApiInfo = createControllerApiInfo<InvitationsController>({
    tags: "Приглашение пользователей",

    methods: {
        sendInvitations: {
            operation: {
                summary: "Рассылка электронных писем-приглашений пользователям"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            }
        },
        confirmInvitation: {
            operation: {
                summary: "Подтверждение приглашённого пользователя"
            },
            response: {
                status: HttpStatus.OK,
                example: swaggerExampleValues.auth.response
            },
            bearerAuth: true
        }
    }
});
