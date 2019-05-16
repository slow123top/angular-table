import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataTableModule } from '../../projects/npm-lib/src/datatable';

import { DropdownModule } from '../../projects/dropdown/src/public_api';
import { SelectModule } from '../../projects/select/src/public_api';

import { RadioModule } from '../../projects/@farris/form/radio/src/public_api';
import { CheckboxModule } from '../../projects/@farris/form/checkbox/src/public_api';
import { TagModule } from '../../projects/tag/src/public_api';
import { HeroJobAdComponent } from './dynamic/hero-job-ad.component';
import { HeroProfileComponent } from './dynamic/hero-profile.component';
import { AdDirective } from './dynamic/ad.directive';
import { AdService } from './dynamic/ad.service';
import { AdBannerComponent } from './dynamic/ad-banner.component';
import { TableComponent } from './table/table.component';
import { InputComponent } from './input/input.component';
@NgModule({
  declarations: [
    AppComponent,
    AdDirective,
    HeroJobAdComponent,
    HeroProfileComponent,
    AdBannerComponent,
    TableComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTableModule,
    DropdownModule,
    SelectModule,
    RadioModule,
    CheckboxModule,
    TagModule,
    FormsModule
  ],
  providers: [AdService],
  entryComponents: [HeroJobAdComponent, HeroProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
