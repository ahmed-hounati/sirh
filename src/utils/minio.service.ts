import { Injectable, Logger, HttpException, HttpStatus, Inject } from '@nestjs/common';
import * as Minio from 'minio';
import * as crypto from 'crypto';
import { BufferedFile } from './file.model';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = 'sirh';

  constructor(@Inject('MINIO_CLIENT') private readonly client: Minio.Client) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(
    file: BufferedFile
  ): Promise<{ url: string }> {

    const baseBucket = this.baseBucket;

    if (!file.mimetype.includes('pdf')) {
      throw new HttpException('Only PDF files are allowed', HttpStatus.BAD_REQUEST);
    }
  
    const tempFilename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(tempFilename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const filename = `${hashedFileName}${ext}`;
    
    // MetaData
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': '1234',
    };
  
    try {
      await this.client.putObject(baseBucket, filename, file.buffer, file.buffer.length, metaData);
      this.logger.log(`File uploaded successfully: ${filename}`);
      return {
        url: `http://localhost:9000/${baseBucket}/${filename}`,
      };
    } catch (error) {
      this.logger.error(`Error uploading file: ${error.message}`);
      throw new HttpException('Error uploading file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

}
