import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  IsInt,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  @IsPositive()
  stock?: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
