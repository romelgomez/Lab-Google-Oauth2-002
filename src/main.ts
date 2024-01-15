import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.getPort() || 3000;

  await app.listen(port);

  logger.log(
    `\n\n ..:: Graphql is running on: http://localhost:${port}/api \n\n`,
  );
}
bootstrap();
