import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import {
    UpdateAdministrativeDivisionDto,
    UpdateAdministrativeDivisionsDto,
    UpdatePostDto
} from "../dto/update-administrative-divisions.dto";

export const UpdateAdministrativeDivisionsDtoApiInfo = createEntityApiInfo<UpdateAdministrativeDivisionsDto>({
    organizationId: {
        description: "Идентификатор организации (24 символа)",
        example: swaggerExampleValues.id.mongo
    },
    administrativeDivisions: {
        description: "Административные подразделения",
        isArray: true,
        type: () => [UpdateAdministrativeDivisionDto]
    }
});

export const UpdateAdministrativeDivisionDtoApiInfo = createEntityApiInfo<UpdateAdministrativeDivisionDto>({
    _id: {
        description: "Идентификатор сущности(24 символа)",
        example: swaggerExampleValues.id.mongo,
        required: false
    },
    __v: {
        description: "Версия сущноси в Mongo",
        example: 1,
        required: false
    },
    title: {
        description: "Название административного подразделения",
        example: "Отдел кадров"
    },
    posts: {
        description: "Название должности в административном подразделении",
        isArray: true,
        type: () => [UpdatePostDto]
    }
});

export const UpdatePostDtoApiInfo = createEntityApiInfo<UpdatePostDto>({
    _id: {
        description: "Идентификатор сущности(24 символа)",
        example: swaggerExampleValues.id.mongo,
        required: false
    },
    __v: {
        description: "Версия сущноси в Mongo",
        example: 1,
        required: false
    },
    title: {
        description: "Название должности",
        example: "Юрист-кадровик"
    }
});
