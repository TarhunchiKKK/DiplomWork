import { Reflector } from "@nestjs/core";
import { Request } from "express";

export type TRequestExtractor<T> = (_: Request) => T;

export const ExtractFromRequest = Reflector.createDecorator<TRequestExtractor<unknown>>();
