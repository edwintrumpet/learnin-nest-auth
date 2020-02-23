import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Configuration } from '../config/config.keys';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'postgres' as 'postgres',
        host: config.get(Configuration.dbHost),
        database: config.get(Configuration.database),
        port: parseInt(config.get(Configuration.dbPort)),
        username: config.get(Configuration.dbUsername),
        password: config.get(Configuration.dbPassword),
        entities: [__dirname + '/../**/*.entity{.js,.ts}'],
        migrations: [__dirname + '/migrations/*{.js,.ts}'],
      } as ConnectionOptions;
    },
  }),
];
