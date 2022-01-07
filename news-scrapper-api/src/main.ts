import { NestFactory } from '@nestjs/core';
import { NewsModule } from './news-scrapper/news.module';

async function bootstrap() {
  const app = await NestFactory.create(NewsModule);
  app.enableCors();
    
  await app.listen(3000);
}
bootstrap();
