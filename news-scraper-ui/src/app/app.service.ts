import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IArticles } from './news.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  getVersion(): Observable<string> {

    return this.httpClient.get<string>(this.baseUrl + '/news/version', { responseType: 'text' as 'json' });
  }

  getNews(): Observable<IArticles[]> {
    return this.httpClient.post<IArticles[]>(this.baseUrl + '/news', {
      "keyword": "Amazon",
      "newsSources": [{
        "source": "The Guardian",
        "url": "https://www.theguardian.com/uk/technology"
      },
      {
        "source": "Reuters",
        "url": "https://www.reuters.com/technology"
      }
      ]
    });

  }



}
