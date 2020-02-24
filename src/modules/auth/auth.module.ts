import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ConfigService } from '../../config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../../config/config.module';
import { Configuration } from '../../config/config.keys';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.jwtSecret),
          signOptions: {
            expiresIn: parseInt(config.get(Configuration.jwtExp)),
          },
        };
      },
    }),
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
