import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const prefix = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(prefix);
  await app.listen(AppModule.port);
  console.log(
    `Server listening on http://localhost:${AppModule.port}/${prefix}`,
  );
}
bootstrap();
