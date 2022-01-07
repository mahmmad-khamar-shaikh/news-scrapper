import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'news-scraper-ui';
  public version: string | undefined;

  constructor(private appService: AppService) {

  }
  ngOnInit(): void {

    this.appService.getVersion().subscribe(data => {
      console.log('data arrived');
      console.log(`version ${data}`);
      this.version = data;
    })

  }






}
