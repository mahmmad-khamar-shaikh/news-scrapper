import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private httpClient: HttpClient) { }
  getVersion(): Observable<string> {
    const baseUrl = environment.apiUrl;
    return this.httpClient.get<string>(baseUrl + '/news/version', { responseType :'text' as 'json'});
  }
}
