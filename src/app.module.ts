import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestModule } from './request/request.module';
import { ApplicationModule } from './application/application.module';
import { OfferModule } from './offer/offer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './request/schema/request.schema';
import { Offer, OfferSchema } from './offer/schema/offer.schema';
import {
  Application,
  ApplicationSchema,
} from './application/schema/application.request';
import { ConfigModule } from '@nestjs/config';
import { MinioClientModule } from './utils/minio-client.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    RequestModule,
    ApplicationModule,
    OfferModule,
    MongooseModule.forFeature([
      { name: Request.name, schema: RequestSchema },
      { name: Offer.name, schema: OfferSchema },
      { name: Application.name, schema: ApplicationSchema },
    ]),
    MinioClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
