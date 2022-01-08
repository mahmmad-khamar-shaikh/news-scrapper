import { Body, Controller, Get, InternalServerErrorException, Logger, Post } from '@nestjs/common';
import { IScrapPayload } from './news.interface';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  private logger = new Logger();

  constructor(private readonly appService: NewsService) { }

  @Post()
  getNews(@Body() payload: IScrapPayload) {
    return this.appService.getArticles(payload).then(selectedNews => {
      return selectedNews;
    }).catch(err => {
      this.logger.log(`error ${err}`)
      return new InternalServerErrorException(err, 'Error Fetching Data');

    });
  }
  @Get('version')
  version() {
    return '1.0.1';
  }
}
