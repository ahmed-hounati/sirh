import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from './schema/request.schema';
import { MinioClientService } from 'src/utils/minio.service';
import { MinioClientModule } from 'src/utils/minio-client.module';

@Injectable()
export class RequestService {
  constructor(
  ) {}

  //   async uploadFile(file: Buffer) {
  //     await this.minioClientService.upload(file);
  //   }
}
