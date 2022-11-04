import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArticlesService } from 'src/app/shared/data-acces/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private articlesService : ArticlesService) { }

  articles$ : Observable<any> = this.articlesService.getArticles()

  ngOnInit(): void {
  }

}
