import {
    PutObjectCommand,
    PutObjectCommandInput,
    S3Client,
    GetObjectCommandInput,
    GetObjectCommand
} from "@aws-sdk/client-s3";
import { environment } from "../config";

export class DocumentsS3Service {
    // private static readonly client = new S3Client({
    //     endpoint: environment.s3Endpoint,
    //     region: environment.s3Region,
    //     credentials: {
    //         accessKeyId: environment.s3AccessKeyId,
    //         secretAccessKey: environment.s3SecretAccessKey
    //     }
    // });

    // private static readonly bucket = environment.documentsS3BucketName;

    public static generateKey(fileName: string) {
        const fileExtension = fileName.split(".").pop() || "";

        const randomString = Math.random().toString(36).substring(2, 8);

        return `${randomString}.${fileExtension}`;
    }

    public static async upload(file: File, key: string) {
        // const command: PutObjectCommandInput = {
        //     Bucket: this.bucket,
        //     Key: key,
        //     Body: file,
        //     ContentType: file.type
        // };
        // try {
        //     await this.client.send(new PutObjectCommand(command));
        //     return true;
        // } catch (error: unknown) {
        //     console.log(error);
        //     return false;
        // }
    }

    public static async download(key: string) {
        // const command: GetObjectCommandInput = {
        //     Bucket: this.bucket,
        //     Key: key
        // };
        // try {
        //     const response = await this.client.send(new GetObjectCommand(command));
        //     return await response.Body?.transformToByteArray();
        // } catch (error: unknown) {
        //     console.log(error);
        //     return null;
        // }
    }
}
