import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignupDto } from '../auth/dto/signup.dto';
import { User } from './user.entity';
import { IJwtPayload } from '../auth/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async validateUser(payload: IJwtPayload): Promise<IJwtPayload> {
    const { id } = payload;
    const user = await this._userRepository.findOne(id);
    if (!user) throw new UnauthorizedException();
    return payload;
  }

  async getUser(key: string, value: string): Promise<User> {
    return this._userRepository.findOne({ [key]: value });
  }

  async getAllUsers(): Promise<User[]> {
    return this._userRepository.find();
  }

  async saveUser(signup: SignupDto): Promise<User> {
    return await this._userRepository.save(signup);
  }
}
