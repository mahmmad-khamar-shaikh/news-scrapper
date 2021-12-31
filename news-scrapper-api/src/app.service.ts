import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { load } from 'cheerio';
import { forkJoin, map } from 'rxjs';
import { IArticles, INewsSource } from './app.interface';



@Injectable()
export class AppService {
  private logger = new Logger();
  private newsSource: Array<INewsSource> = [{
    source: 'The Guardian',
    url: 'https://www.theguardian.com/uk/technology'
  },
  {
    source: 'Reuters',
    url: 'https://www.theguardian.com/uk/technology'
  }
  ]
  constructor(private httpService: HttpService) { }

  getArticles(keyword: string) {
  const  allArticles = this.httpService
      .get('https://www.theguardian.com/uk/technology')
      .pipe(map((res) => res.data),
        map((_html) => this.getDataFromRawHtml(_html, keyword)));
    return allArticles;
  }

  getDataFromRawHtml(rawHtml: any, keyword: string) {
    const articles: Array<IArticles> = []
    const $ = load(rawHtml, { lowerCaseTags: true, lowerCaseAttributeNames: true });
    $('a:contains("' + keyword + '")', rawHtml)
      .each(function () {

        const title = $(this).text();
        const url = $(this).attr('href');
        if (articles.findIndex((item) => item.url === url) === -1) {
          articles.push({ title, url });
        }
      });
    this.logger.log(`articales ${articles}`);
    return articles;

  }




}
