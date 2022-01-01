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
    url: 'https://www.reuters.com/business/finance/'
  }
  ]
  constructor(private httpService: HttpService) { }

  getArticles(keyword: string): Promise<IArticles[]> {
    const newsFetchPromise = new Promise<IArticles[]>((resolve, reject) => {
      const allArticles: IArticles[] = [];
      forkJoin(this.newsSource.map(item => this.httpService.get(item.url)))
        .subscribe(results => {

          results.map(result => {
            const formatedData = this.getDataFromRawHtml(result.data, keyword);
            this.logger.log(`formatted data ${JSON.stringify(formatedData)}`);
            return allArticles.push(...formatedData);
          });
          resolve(allArticles);
        });
    });
    return newsFetchPromise;

  }

  getDataFromRawHtml(rawHtml: any, keyword: string): IArticles[] {
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
