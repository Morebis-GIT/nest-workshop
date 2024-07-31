import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  MaxLength,
  ArrayMinSize,
  ArrayMaxSize,
  MinLength,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaggedUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The unique identifier of the user',
  })
  userId: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'The unique post identifier',
  })
  postId: number;
}

export class CreatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  @ApiProperty({
    description: 'Description of the post',
  })
  description: string;

  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @Type(() => CreateTaggedUserDto)
  @ApiProperty({
    type: [CreateTaggedUserDto],
    description: 'The users tagged in the post',
  })
  taggedPeople: CreateTaggedUserDto[];
}
