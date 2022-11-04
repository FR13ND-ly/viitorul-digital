import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/features/landing-page/landing-page.component';
import { ArticlesComponent } from './landing-page/ui/articles/articles.component';
import { DescriptionComponent } from './landing-page/ui/description/description.component';
import { HeroComponent } from './landing-page/ui/hero/hero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PreviewTextPipe } from './shared/pipes/preview-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeroComponent,
    ArticlesComponent,
    DescriptionComponent,
    PreviewTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
