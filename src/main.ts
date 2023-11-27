import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {addSwaggerToApp} from './utils/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new ApiKeyGuard());
  app.useGlobalInterceptors(new WrapResponseInterceptor());

  addSwaggerToApp(app);
  await app.listen(3000);
}
bootstrap();
