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
        this.verify(dto);

        await this.versionsService.update(dto.versionId, { hash: dto.hash });
    }

    public verify(dto: IVerifyDocumentHashDto) {
        const isValid = this.hmacService.verify(dto.hash, dto.sign);

        if (!isValid) {
            throw new BadRequestException("Документ был изменен.");
        }

        return isValid;
    }
}
