import { Body, Controller, Get, Logger } from '@nestjs/common';
import { IScrapPayload } from './app.interface';
import { AppService } from './app.service';

@Controller('news')
export class AppController {
  private logger = new Logger();

  constructor(private readonly appService: AppService,
  ) { }

  @Get()
  async getHello(@Body() payload: IScrapPayload) {
    this.logger.log(`payload ${JSON.stringify(payload)}`);
    return await this.appService.getArticles(payload).then(data => {
      return data;
    }).catch(err => this.logger.log(`error ${err}`));
  }
}
