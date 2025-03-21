import { IsNotEmpty, IsPositive, IsString } from "class-validator";
import { IUpdateUrgencyIntervalDto } from "common/grpc";

export class UpdateUrgencyIntevalDto implements IUpdateUrgencyIntervalDto {
    @IsNotEmpty({ message: "Идентификатор организации не указан" })
    @IsString({ message: "Идентификатор организации должен быть строкой" })
    organizationId: string;

    @IsNotEmpty({ message: "Укажите нтервал срочности" })
    @IsPositive({ message: "Интервал не может быть меньше нуля" })
    urgencyInterval: number;
}
