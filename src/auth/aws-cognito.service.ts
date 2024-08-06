import {
  AdminInitiateAuthCommand,
  AuthFlowType,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRegisterUserDto } from './dto/auth-register.dto';
import { AuthLoginUserDto } from './dto/auth-login.dto';

@Injectable()
export class AwsCognitoService {
  private client: CognitoIdentityProviderClient;
  private clientId = process.env.AWS_COGNITO_CLIENT_ID;

  constructor() {
    // NOTE: not necessary if you have aws cli configured user
    // this.client = new CognitoIdentityProviderClient({});
    this.client = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async registerUser(authRegisterUserDto: AuthRegisterUserDto) {
    const { firstName, lastName, email, password } = authRegisterUserDto;

    const command = new SignUpCommand({
      ClientId: this.clientId,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'given_name',
          Value: firstName,
        },
        {
          Name: 'family_name',
          Value: lastName,
        },
      ],
    });

    try {
      return await this.client.send(command);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async confirmSignUp(email: string, confirmationCode: string) {
    let confirmationResult = null;
    const command = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      Username: email,
      ConfirmationCode: confirmationCode,
    });

    try {
      confirmationResult = await this.client.send(command);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return confirmationResult;
  }

  async authenticateUser(authLoginUserDto: AuthLoginUserDto) {
    const { email, password } = authLoginUserDto;
    let authResult = null;

    // Auth user
    const command = new AdminInitiateAuthCommand({
      AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
      ClientId: this.clientId,
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    try {
      authResult = await this.client.send(command);
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return {
      accessToken: authResult.AuthenticationResult.AccessToken,
      refreshToken: authResult.AuthenticationResult.RefreshToken,
    };
  }
}
