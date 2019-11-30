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
import { TablePageRoutingModule } from './table-page-routing.module';

// 组件
import { TablePageComponent } from './table-page.component';
import { QueryTableComponent } from './query-table/query-table.component';
// 服务

@NgModule({
    declarations: [
        QueryTableComponent,
        TablePageComponent
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
        TablePageRoutingModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }],
    exports: [QueryTableComponent, TablePageComponent]
})
export class TablePageModule { }
