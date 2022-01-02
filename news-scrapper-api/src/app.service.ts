import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { load } from 'cheerio';
import { forkJoin, map } from 'rxjs';
import { IArticles, INewsSource, IScrapPayload } from './app.interface';



@Injectable()
export class AppService {
  private logger = new Logger();
  private newsSources: Array<INewsSource> = [{
    source: 'The Guardian',
    url: 'https://www.theguardian.com/uk/technology'
  },
  {
    source: 'Reuters',
    url: 'https://www.reuters.com/technology'
  }
  ]
  constructor(private httpService: HttpService) { }

  getArticles(payload: IScrapPayload): Promise<IArticles[]> {
    const newsFetchPromise = new Promise<IArticles[]>((resolve, reject) => {
      const allArticles: IArticles[] = [];
      let sourceCounter = 0;
      payload.newsSources.map(source => {
        this.httpService.get(source.url)
          .subscribe(result => {
            const formatedData = this.getDataFromRawHtml(result.data, payload.keyword, source.source);
            allArticles.push(...formatedData);
            sourceCounter++;
            if (sourceCounter === this.newsSources.length) {
              resolve(allArticles)
            }
          });
      });
    });
    return newsFetchPromise;
  }

  getDataFromRawHtml(rawHtml: any, keyword: string, source: string): IArticles[] {
    const articles: Array<IArticles> = []
    const $ = load(rawHtml, { lowerCaseTags: true, lowerCaseAttributeNames: true });
    $('a:contains("' + keyword + '")', rawHtml)
      .each(function () {

        const title = $(this).text();
        const url = $(this).attr('href');
        if (articles.findIndex((item) => item.url === url) === -1) {
          articles.push({ title, url, source });
        }
      });
    return articles;

  }
}
