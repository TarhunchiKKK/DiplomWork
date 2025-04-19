import { Reflector } from "@nestjs/core";
import { DocumentOperation } from "../../enums/document-operation.enum";

export const ProvideOperation = Reflector.createDecorator<DocumentOperation>();
