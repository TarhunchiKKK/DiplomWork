import { createEntityApiInfo, swaggerExampleValues } from "common/swagger";
import { UpdateDocumentAimDto, UpdateDocumentAimsDto } from "../dto/update-document-aims.dto";

export const UpdateDocumentAimsDtoApiInfo = createEntityApiInfo<UpdateDocumentAimsDto>({
    organizationId: {
        description: "Идентификатор организации (24 символа)",
        example: swaggerExampleValues.mongoId
    },
    documentAims: {
        description: "Цели документов",
        isArray: true,
        type: () => [UpdateDocumentAimDto],
        example: [{ _id: "5d6ede6a0ba62570afcedd3a", __v: 1, value: "На ознакомление" }, { value: "На регистрацию" }]
    }
});

export const UpdateDocumentAimDtoApiInfo = createEntityApiInfo<UpdateDocumentAimDto>({
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
        description: "Название цели документа",
        example: "На ознакомление"
    }
});
