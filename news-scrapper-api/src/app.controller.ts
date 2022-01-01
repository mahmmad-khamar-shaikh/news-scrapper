import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('news')
export class AppController {
  private logger = new Logger();

  constructor(private readonly appService: AppService,
  ) { }

  @Get(':keyword')
 async getHello(@Param('keyword') keyword) {
    this.logger.log(`Keyword ${keyword}`);
 return  await this.appService.getArticles(keyword).then(data => {
      this.logger.log(`data in controller ${JSON.stringify(data)}`);
      return data;
    }).catch(err => this.logger.log(`error ${err}`));
  }
}
