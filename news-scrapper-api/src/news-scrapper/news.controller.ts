import { Body, Controller, Get, InternalServerErrorException, Logger } from '@nestjs/common';
import { IScrapPayload } from './news.interface';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  private logger = new Logger();

  constructor(private readonly appService: NewsService) { }

  @Get()
  getNews(@Body() payload: IScrapPayload) {
    return this.appService.getArticles(payload).then(selectedNews => {
      return selectedNews;
    }).catch(err => {
      return new InternalServerErrorException(err, 'Error Fetching Data');
      this.logger.log(`error ${err}`)
    });
  }
  @Get('version')
  version() {
    return  '1.0.1';
  }
}
