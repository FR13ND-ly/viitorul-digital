import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { LandingPageComponent } from './landing-page/features/landing-page/landing-page.component';
import { AuthorizedGuard } from './shared/guards/authorized.guard';

const routes: Routes = [
  { path : "articol/:id", loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)},
  { path : "edit/:id", component: EditComponent, canActivate: [ AuthorizedGuard ]},
  { path : "", component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
