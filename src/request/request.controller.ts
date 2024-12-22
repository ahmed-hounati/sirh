import {
  Controller,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/utils/file.model';
import { MinioClientService } from 'src/utils/minio.service';

@Controller('request')
export class RequestController {
  constructor(private readonly minioClientService: MinioClientService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: BufferedFile) {
    try {
      const result = await this.minioClientService.upload(file);
      return {
        message: 'File uploaded successfully',
        fileUrl: result.url,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to upload file',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // @Delete('delete/:fileName')
  // async deleteFile(@Param('fileName') fileName: string) {
  //   try {
  //     await this.minioClientService.delete(fileName);
  //     return {
  //       message: 'File deleted successfully',
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       error.message || 'Failed to delete file',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
}
