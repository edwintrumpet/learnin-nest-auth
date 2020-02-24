import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignupDto } from './dto/signup.dto';
import { User } from '../user/user.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { SigninDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async signup(signup: SignupDto): Promise<User> {
    const { email, password } = signup;
    const userExists = await this._userService.getUser('email', email);
    if (userExists) throw new ConflictException('User already exists!');
    const salt = await genSalt(10);
    const securePassword = await hash(password, salt);
    const toSave = { ...signup, password: securePassword };
    return this._userService.saveUser(toSave);
  }

  async signin(signin: SigninDto): Promise<{ token: string }> {
    const { email, password } = signin;
    const user = await this._userService.getUser('email', email);
    const isMatch = await compare(password, user.password);
    if (!user || !isMatch) throw new UnauthorizedException();
    const payload: IJwtPayload = {
      id: user.id,
    };
    const token = await this._jwtService.sign(payload);
    return { token };
  }
}
