// ng
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// 第三方
import { NzGridModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';


// 模块
import { AbnormalPageRoutingModule } from './abnormalpage-routing.module';

// 组件
import { AbnormalPageComponent } from './abnormalpage.component';
import { Page404Component } from './abnormalpage.component';


@NgModule({
    declarations: [
        AbnormalPageComponent,
        Page404Component
    ],
    imports: [
        CommonModule,
        FormsModule,
        NzGridModule,
        NzCardModule,
        NzIconModule,
        NzButtonModule,
        AbnormalPageRoutingModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }],
    exports: [AbnormalPageComponent]
})
export class AbnormalPageModule { }
