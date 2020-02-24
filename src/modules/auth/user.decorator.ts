import { createParamDecorator } from '@nestjs/common';
import { User } from '../user/user.entity';

export const GetUser = createParamDecorator((data, req): User => req.user);
