import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AwsCognitoService } from './aws-cognito.service';
import { AuthRegisterUserDto } from './dto/auth-register.dto';
import { AuthConfirmSignUpDto } from './dto/auth-confirm-sign-up.dto';
import { AuthLoginUserDto } from './dto/auth-login.dto';

@ApiTags('Auth')
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 500, description: 'Internal server error' })
@Controller('auth')
export class AuthController {
  constructor(private readonly awsCognitoService: AwsCognitoService) {}

  @ApiOperation({ summary: 'Sign Up a new user' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @Post('/sign-up')
  async register(
    @Body() authRegisterUserDto: AuthRegisterUserDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.awsCognitoService.registerUser(authRegisterUserDto);
    res.status(HttpStatus.CREATED).send();
  }

  @ApiOperation({ summary: 'Confirm Sign Up' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @Post('/sign-up/confirm')
  async confirmSignUp(
    @Body() authConfirmSignUpDto: AuthConfirmSignUpDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.awsCognitoService.confirmSignUp(
      authConfirmSignUpDto.email,
      authConfirmSignUpDto.confirmationCode,
    );
    res.status(HttpStatus.OK).send();
  }

  @ApiOperation({ summary: 'Login into the system' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @Post('/login')
  async login(@Body() authLoginUserDto: AuthLoginUserDto) {
    return await this.awsCognitoService.authenticateUser(authLoginUserDto);
  }
}
