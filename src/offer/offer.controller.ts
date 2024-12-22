import { Body, Controller, Post } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}


  @Post('create')
  create(@Body() createOfferDto: CreateOfferDto){
    return this.offerService.create(createOfferDto);
  }
}
