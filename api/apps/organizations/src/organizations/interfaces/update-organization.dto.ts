import { IUpdateAdministrativeDivisionsDto, IUpdateDocumentAimsDto, IUpdateDocumentTypesDto } from "common/grpc";

export interface IUpdateOrganizationDto {
    documentAims?: IUpdateDocumentAimsDto["documentAims"];

    documentTypes?: IUpdateDocumentTypesDto["documentTypes"];

    administrativeDivisions?: IUpdateAdministrativeDivisionsDto["administrativeDivisions"];
}
