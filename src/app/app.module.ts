import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableModule } from '../../projects/npm-lib/src/datatable';

import { DropdownModule } from '../../projects/dropdown/src/public_api';
import { SelectModule } from '../../projects/select/src/public_api';

import { RadioModule } from '../../projects/radio/src/public_api';
import { CheckboxModule } from '../../projects/checkbox/src/public_api';
import { TagModule } from '../../projects/tag/src/public_api';
import { TableComponent } from './table/table.component';
import { InputComponent } from './input/input.component';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { DataOperationComponent } from './data-operation/data-operation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { DataTableComponent } from './data-table/data-table.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { DataFormComponent } from './data-form/data-form.component';

/* dashboard */
import { FormPageModule } from './form-page/form-page.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    InputComponent,
    DataOperationComponent,
    DataTableComponent,
    HomeComponent,
    IndexComponent,
    DataFormComponent
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
