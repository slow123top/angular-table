// ng
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// 第三方
import { NzGridModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzRateModule } from 'ng-zorro-antd/rate';

import { NgxEchartsModule } from 'ngx-echarts';
// 模块
import { DashboardRoutingModule } from './dashboard-routing.module';

// 组件
import { DashboardComponent } from './dashboard.component';
import { MainControlComponent } from './main-control/main-control.component';
import { CheckControlComponent } from './check-control/check-control.component';
// 服务

@NgModule({
    declarations: [
        DashboardComponent,
        MainControlComponent,
        CheckControlComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NzGridModule,
        NzCardModule,
        NzTagModule,
        NzIconModule,
        NzToolTipModule,
        NzProgressModule,
        NzDividerModule,
        NzAvatarModule,
        NzStepsModule,
        NzStatisticModule,
        NzDatePickerModule,
        NzTableModule,
        NzListModule,
        NgxEchartsModule,
        NzRateModule,
        DashboardRoutingModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }],
    exports: [DashboardComponent, MainControlComponent]
})
export class DashboardModule { }
