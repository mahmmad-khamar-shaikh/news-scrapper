import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { load } from 'cheerio';
import { IArticles, IScrapPayload } from './news.interface';



@Injectable()
export class NewsService {

  constructor(private httpService: HttpService) { }

  public getArticles(payload: IScrapPayload): Promise<IArticles[]> {
    const newsFetchPromise = new Promise<IArticles[]>((resolve, reject) => {
      const allArticles: IArticles[] = [];
      let sourceCounter = 0;
      payload.newsSources.map(source => {
        this.httpService.get(source.url)
          .subscribe({
            next: (result) => {
              const formatedData = this.getDataFromRawHtml(result.data, payload.keyword, source.source);
              allArticles.push(...formatedData);
              sourceCounter++;
              if (sourceCounter === payload.newsSources.length) {
                resolve(allArticles)
              }
            },
            error: (err) => {
              console.log(`error fetching data from target ${err}`);
            }
          });
      });
    });
    return newsFetchPromise;
  }

  private getDataFromRawHtml(rawHtml: any, keyword: string, source: string): IArticles[] {
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
