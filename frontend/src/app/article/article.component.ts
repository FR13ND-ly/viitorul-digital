import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { ArticlesService } from '../shared/data-acces/articles.service';
import { UserService } from '../shared/data-acces/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  constructor(private articlesService : ArticlesService, private route: ActivatedRoute, private userService : UserService) {}
  
  url$ = this.route.params.pipe(
    map((params : any) => params['id'])
  )

  article$ : Observable<any> = this.url$.pipe(
    switchMap((id : any) => this.articlesService.getArticle(id))
  )

  comments$ : Observable<any> = this.url$.pipe(
    switchMap((id : any) => this.articlesService.getComments(id))
  )

  likes$ : Observable<any> = this.url$.pipe(
    switchMap((id : any) => this.userService.getUserUpdateListener().pipe(
      switchMap((user : any) => this.articlesService.getLikes({
        articleId : id,
        token : user.uid
      }))
    ))
  )
  user$ = this.userService.getUserUpdateListener()

  ngOnInit(): void {}

  onSendComment(form : any, comments : any, author : any, articleId : any) {
    if (!form.form.value.text.trim()) return;
    let comment = {
      articleId : articleId,
      author : author.displayName,
      text : form.form.value.text,
      imageUrl : author.photoURL
    }
    this.articlesService.addComment(comment).subscribe()
    form.reset()
    comments.unshift(comment)
  }

  onLike(likes : any, id : any, user : any) {
    likes.liked = !likes.liked
    likes.count += likes.liked ? 1 : -1
    let data = {
      articleId : id,
      token : user.uid
    }
    this.articlesService.like(data).subscribe()
  }

  onLogin() {
    this.userService.login()
  }

  onLogout() {
    this.userService.logout()
  }

  onShare() {
    var windowShare: any = window.open(
      "http://www.facebook.com/sharer.php?u=" + location.href,
      'facebook-popup',
      'height=350,width=600'
    );
    if (windowShare.focus) windowShare.focus();
  }
}
