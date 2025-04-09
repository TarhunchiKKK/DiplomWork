import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import { UpdateDocumentTypeDto, UpdateDocumentTypesDto } from "../dto/update-document-types.dto";

export const UpdateDocumentTypesDtoApiInfo = createEntityApiInfo<UpdateDocumentTypesDto>({
    organizationId: {
        description: "Идентификатор организации (24 символа)",
        example: swaggerExampleValues.mongoId
    },
    documentTypes: {
        description: "Типы документов",
        isArray: true,
        type: () => [UpdateDocumentTypeDto]
    }
});

export const UpdateDocumentTypeDtoApiInfo = createEntityApiInfo<UpdateDocumentTypeDto>({
    _id: {
        description: "Идентификатор сущности(24 символа)",
        example: swaggerExampleValues.mongoId,
        required: false
    },
    __v: {
        description: "Версия сущноси в Mongo",
        example: 1,
        required: false
    },
    value: {
        description: "Название типа документа",
        example: "Правовой акт"
    }
});
