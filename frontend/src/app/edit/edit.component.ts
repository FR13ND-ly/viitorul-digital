import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticlesService } from '../shared/data-acces/articles.service';
import { switchMap, map } from 'rxjs'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private route : ActivatedRoute, private articlesService : ArticlesService) { }

  article$ = this.route.params.pipe(
    switchMap((params : any) => this.articlesService.getArticle(params['id']).pipe(
      map((article : any) => {
        article.id = params['id']
        return article
      })
    ))
  )

  ngOnInit(): void {
  }

  onSaveArticle(article : any) {
    this.articlesService.saveArticle(article).subscribe()
  }

}
