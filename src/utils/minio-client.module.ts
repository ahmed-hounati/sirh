import { Module } from '@nestjs/common';
import * as Minio from 'minio';

export const MinioClientProvider = {
  provide: 'MINIO_CLIENT',
  useFactory: () => {
    return new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: parseInt(process.env.MINIO_PORT || '9000', 10),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  },
};

@Module({
  providers: [MinioClientProvider],
  exports: [MinioClientProvider],
})
export class MinioClientModule {}
