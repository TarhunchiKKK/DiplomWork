import { DateFieldsToString } from "@/shared/api";
import { TVersion } from "../models";

export type TFindVersionsResponse = {
    versions: DateFieldsToString<TVersion>[];
};
