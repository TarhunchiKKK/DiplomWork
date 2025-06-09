import { BadRequestException, Injectable } from "@nestjs/common";
import { DocumentVersionsService } from "../versions/document-versions.service";
import { HmacService } from "common/modules";
import { IUpdateDocumentHashDto, IVerifyDocumentHashDto } from "common/grpc";

@Injectable()
export class DocumentHashingService {
    public constructor(
        private readonly versionsService: DocumentVersionsService,

        private readonly hmacService: HmacService
    ) {}

    public async update(dto: IUpdateDocumentHashDto) {
        await this.versionsService.update(dto.versionId, { hash: dto.hash });
    }

    public async verify(dto: IVerifyDocumentHashDto) {
        const version = await this.versionsService.findOneById(dto.versionId);

        const isValid = version.hash === dto.hash;

        if (!isValid) {
            throw new BadRequestException("Документ был изменен.");
        }

        return isValid;
    }
}
