import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { load } from 'cheerio';
import { map } from 'rxjs';
import { IArticles, INewsSource } from './app.interface';



@Injectable()
export class AppService {
  private logger = new Logger();
  private newsSource: Array<INewsSource> = [{
    source: 'The Guardian',
    url: 'https://www.theguardian.com/uk/technology'
  },
  {
    source : 'Reuters',
    url : 'https://www.reuters.com/business/finance/'
  }
]
  constructor(private httpService: HttpService) { }

  async getArticlesAsync(keyword: string) {
    const articles: Array<IArticles> = []

    
    const formatedArticles = await this.httpService
      .get('https://www.theguardian.com/uk/technology')
      .pipe(map((res) => {
        return res.data;
      }),
        map((_html) => {
          const $ = load(_html, { lowerCaseTags: true, lowerCaseAttributeNames: true });
          $('a:contains("' + keyword + '")', _html)
            .each(function () {

              const title = $(this).text();
              const url = $(this).attr('href');
              if (articles.findIndex((item) => item.url === url) === -1) {
                articles.push({ title, url });
              }
            });
          this.logger.log(`articales ${articles}`);
          return articles;

        }));
    return formatedArticles;
  }
}
