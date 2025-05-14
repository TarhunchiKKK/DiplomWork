import { DateFieldsToString } from "@/shared/api";
import { TVersion } from "../models";

export type TFindVersionResponse = {
    versions: DateFieldsToString<TVersion>[];
};
