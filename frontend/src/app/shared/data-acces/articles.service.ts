import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'article/'

  getArticle(id : any) {
    return this.http.get(`${this.APIUrl}getArticle/${id}/`)
  }

  getArticles() {
    return this.http.get(this.APIUrl + 'getArticlesList/')
  }

  saveArticle(article : any) {
    return this.http.post(this.APIUrl + 'editArticle/', article)
  }

  like(data : any) {
    return this.http.post(this.APIUrl + 'like/', data)
  }

  getComments(id : any) {
    return this.http.get(`${this.APIUrl}getComments/${id}/`)
  }

  addComment(comment : any) {
    return this.http.post(this.APIUrl + 'addComment/', comment)
  }

  getLikes(data : any) {
    return this.http.post(this.APIUrl + 'getLikes/', data)
  }
}
