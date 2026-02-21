import {
  IsString,
  IsInt,
  Min,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsDateString,
} from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  publicationDate: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  categoryIds: number[];
}
