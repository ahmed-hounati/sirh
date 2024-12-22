import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsString()
  department: string;

  @IsString()
  @IsNotEmpty()
  hrId: string;
}
