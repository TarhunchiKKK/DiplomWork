import { createControllerApiInfo } from "common/swagger";
import { OrganizationsController } from "../organizations.controller";
import { HttpStatus } from "@nestjs/common";

export const OrganizationsControllerApi = createControllerApiInfo<OrganizationsController>({
    tags: "Организации",

    methods: {
        findOneById: {
            operation: {
                summary: "Поиск организации по идентификатору"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            },
            bearerAuth: true
        },
        updateAdministrativeDivisions: {
            operation: {
                summary: "Обновление административных подразделений организации"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            },
            bearerAuth: true
        },
        updateDocumentAims: {
            operation: {
                summary: "Обновление целей документов"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            },
            bearerAuth: true
        },
        updateDocumentTypes: {
            operation: {
                summary: "Обновление типов документов"
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            },
            bearerAuth: true
        },
        updateUrgencyInterval: {
            operation: {
                summary: "Обновление интервал срочности документов",
                deprecated: true
            },
            response: {
                status: HttpStatus.OK,
                description: "Ничего не возвращает"
            },
            bearerAuth: true
        }
    }
});
