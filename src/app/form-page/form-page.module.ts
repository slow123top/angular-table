import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BaseFormComponent } from './base-form/base-form.component';
import { FormPageComponent } from './form-page.component';
import { FormPageRoutingModule } from './form-page-routing.module';
@NgModule({
    declarations: [
        BaseFormComponent,
        FormPageComponent
    ],
    imports: [
        CommonModule,
        NzGridModule,
        NzCardModule,
        FormPageRoutingModule
    ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }],
    exports: [BaseFormComponent, FormPageComponent]
})
export class FormPageModule { }
