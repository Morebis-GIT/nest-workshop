import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthConfirmSignUpDto {
  @ApiProperty({
    example: 'mail@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '111111',
  })
  @IsString()
  confirmationCode: string;
}
