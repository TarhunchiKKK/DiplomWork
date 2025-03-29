export class CreateOrganizationDto {
    urgencyInterval: number;

    documentAims: { value: string }[];

    documentTypes: { value: string }[];

    administrativeDivisions: {
        title: string;

        posts: [
            {
                title: string;
            }
        ];
    }[];
}
