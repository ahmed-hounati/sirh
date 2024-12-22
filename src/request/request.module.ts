import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { MinioClientService } from 'src/utils/minio.service';
import { MinioClientModule } from 'src/utils/minio-client.module';

@Module({
  imports: [MinioClientModule],
  controllers: [RequestController],
  providers: [RequestService, MinioClientService],
})
export class RequestModule {}
