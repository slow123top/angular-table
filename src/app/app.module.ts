import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataTableModule } from '../../projects/npm-lib/src/datatable';

import { HeroJobAdComponent } from './dynamic/hero-job-ad.component';
import { HeroProfileComponent } from './dynamic/hero-profile.component';
import { AdDirective } from './dynamic/ad.directive';
import { AdService } from './dynamic/ad.service';
import { AdBannerComponent } from './dynamic/ad-banner.component';
@NgModule({
  declarations: [
    AppComponent,
    AdDirective,
    HeroJobAdComponent,
    HeroProfileComponent,
    AdBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTableModule
  ],
  providers: [AdService],
  entryComponents: [HeroJobAdComponent, HeroProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
