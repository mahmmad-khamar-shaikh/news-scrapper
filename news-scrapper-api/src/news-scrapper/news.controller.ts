import { Body, Controller, Get, Logger } from '@nestjs/common';
import { IScrapPayload } from './news.interface';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  private logger = new Logger();

  constructor(private readonly appService: NewsService) { }

  @Get()
  async getHello(@Body() payload: IScrapPayload) {
    this.logger.log(`payload ${JSON.stringify(payload)}`);
    return await this.appService.getArticles(payload).then(data => {
      return data;
    }).catch(err => this.logger.log(`error ${err}`));
  }
}
