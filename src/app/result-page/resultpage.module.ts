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
import { ResultPageRoutingModule } from './resultpage-routing.module';

// 组件
import { ResultPageComponent } from './resultpage.component';
import { SuccessPageComponent } from './success-page/successpage.component';
import { FailPageComponent } from './fail-page/failpage.component';
// 服务

@NgModule({
    declarations: [
        ResultPageComponent,
        SuccessPageComponent,
        FailPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NzGridModule,
        NzCardModule,
        NzIconModule,
        NzButtonModule,
        ResultPageRoutingModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }],
    exports: [ResultPageComponent]
})
export class ResultPageModule { }
