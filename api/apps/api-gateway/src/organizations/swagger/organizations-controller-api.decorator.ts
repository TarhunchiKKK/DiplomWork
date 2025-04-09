import { createControllerApiInfo } from "common/swagger";
import { OrganizationsController } from "../organizations.controller";

export const OrganizationsControllerApi = createControllerApiInfo<OrganizationsController>({
    tags: "Организации",

    methods: {
        findOneById: {
            operation: {
                summary: "Поиск организации по идентификатору"
            },
            response: {
                status: 200,
                description: "Находит организации по идентификатору"
            }
        },
        updateAdministrativeDivisions: {
            operation: {
                summary: "Обновление административных подразделений организации"
            },
            response: {
                status: 200,
                description: "Обновляет административну иерархию организации"
            }
        },
        updateDocumentAims: {
            operation: {
                summary: "Обновление целей документов"
            },
            response: {
                status: 200,
                description: "Обновляет цели документов в рамках организации"
            }
        },
        updateDocumentTypes: {
            operation: {
                summary: "Обновление типов документов"
            },
            response: {
                status: 200,
                description: "Обновляет типы документов в рамках организации"
            }
        },
        updateUrgencyInterval: {
            operation: {
                summary: "Обновление интервал срочности документов",
                deprecated: true
            },
            response: {
                status: 200,
                description: "Обновляет интервал срочности документов в рамках организации"
            }
        }
    }
});
