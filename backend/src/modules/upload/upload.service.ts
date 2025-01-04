import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { FileUpload } from 'src/utils/types';

@Injectable()
export class UploadService {
    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow<string>('AWS_S3_REGION'),
        credentials: {
            accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY')
        }
    })
    
    constructor (private readonly configService:ConfigService) {}

    async getSignedUrl(fileName: string) {
        const command = new GetObjectCommand({
            Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
            Key: fileName,
        });

        const signedUrl = await getSignedUrl(this.s3Client, command);

        return { signed_url: signedUrl };
    }

    async putSignedUrl(fileContent: FileUpload) {
        const command = new PutObjectCommand({
            Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
            Key: fileContent.fileName,
            ContentType: fileContent.contentType
        })

        const signedUrl = await getSignedUrl(this.s3Client, command);
        return { file_name: fileContent.fileName, file_content_type: fileContent.contentType, signed_url: signedUrl };
    }

    async deleteObject(fileName: string) {
        const command = new DeleteObjectCommand({
            Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
            Key: fileName
        })

        await this.s3Client.send(command);
        return { message: "Successfully deleted.", status: true };
    }
}
