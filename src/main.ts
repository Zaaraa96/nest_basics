import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {addSwaggerToApp} from './utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  addSwaggerToApp(app);
  await app.listen(3000);
}
bootstrap();
