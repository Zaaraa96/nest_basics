import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {addSwaggerToApp} from './utils/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  addSwaggerToApp(app);
  await app.listen(3000);
}
bootstrap();
