import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto } from './dto';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signup: SignupDto): Promise<User> {
    return this._authService.signup(signup);
  }

  @Post('signin')
  async signin(@Body() signin: SigninDto): Promise<{ token: string }> {
    return this._authService.signin(signin);
  }
}
