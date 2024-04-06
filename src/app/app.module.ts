import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NetworkComponent } from './network/network.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { IntroComponent } from './intro/intro.component';
import { ProjectComponent } from './project/project.component';
import { ProjectPreviewComponent } from './project-preview/project-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NetworkComponent,
    PortfolioComponent,
    IntroComponent,
    ProjectComponent,
    ProjectPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
