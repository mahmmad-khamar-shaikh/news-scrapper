import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('news')
export class AppController {
  private logger = new Logger();

  constructor(private readonly appService: AppService,
  ) { }

  @Get(':keyword')
  getHello(@Param('keyword') keyword) {
    this.logger.log(`Keyword ${keyword}`);
    const data = this.appService.getArticles(keyword);
    this.logger.log(`data in controller ${data}`);
    return data;
  }
}
