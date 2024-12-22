import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Offer } from './schema/offer.schema';
import { Model } from 'mongoose';

@Injectable()
export class OfferService {
  constructor(@InjectModel(Offer.name) private readonly offerModel: Model<Offer>) {}
  async create(allData: any) {
    const createOfferDto = allData.createOfferDto;
    const userId = allData.userId;

    try {
      const offer = new this.offerModel({ ...createOfferDto, userId });
      const savedOffer = await offer.save();

      return { offer: savedOffer };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Offer already exists');
      }
      throw error;
    }
  }
}
