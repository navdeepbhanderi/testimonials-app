import { Body, Controller, Get, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileUpload } from 'src/utils/types';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Get('name')
    getPresignedUrl() {
        return this.uploadService.getSignedUrl('nestjs-tutorial.mp4')
    }

    @Post('send')
    sendImage(@Body() fileContent: FileUpload) {
        return this.uploadService.putSignedUrl(fileContent)
    }
}
