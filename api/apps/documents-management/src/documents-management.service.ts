import { Injectable } from "@nestjs/common";

@Injectable()
export class DocumentsManagementService {
    getHello(): string {
        return "Hello World!";
    }
}
