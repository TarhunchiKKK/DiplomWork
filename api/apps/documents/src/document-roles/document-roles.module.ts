import { Module } from "@nestjs/common";
import { DocumentRolesService } from "./document-roles.service";
import { DocumentAccessTokensModule } from "common/modules";

@Module({
    imports: [DocumentAccessTokensModule],
    providers: [DocumentRolesService],
    exports: [DocumentRolesService]
})
export class DocumentRolesModule {}
