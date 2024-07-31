import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../shared/pagination.dto';

export class PostQueryParamsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The status of the post',
  })
  status?: string;

  // Example of how to validate an array of strings

  //   @Transform((transform) =>
  //     Array.isArray(transform.value) ? transform.value : [transform.value],
  //   )
  //   @IsArray()
  //   @IsOptional()
  //   @IsIn(
  //     [
  //       UserPostStatus.PENDING,
  //       UserPostStatus.ACTIVE,
  //       UserPostStatus.STARRED,
  //       UserPostStatus.ARCHIVED,
  //     ],
  //     { each: true },
  //   )
  //   status: UserPostStatus[];
}
