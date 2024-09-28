import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { setupGlobalConfig } from './common/config/global.config';
import { SwaggerConfig } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3001;
  const logger = new Logger('Bootstrap');

  console.log(PORT);

  SwaggerConfig(app);

  app.setGlobalPrefix('api');
  

  setupGlobalConfig(app);

  await app.listen(PORT);

  logger.log(`Application is running on port ${PORT}`);
}
bootstrap();
