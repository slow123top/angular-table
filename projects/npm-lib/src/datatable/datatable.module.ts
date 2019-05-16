import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { IntlModule } from '@progress/kendo-angular-intl';
// import { FarrisPopoverModule } from '../../popover';
import { DataTableComponent } from './datatable.component';
import {
    PerfectScrollbarModule, PaginationModule, ColumnFormatService, FarrisPopoverModule, DateTimeHelperService,
    NumberHelperService
} from '@farris/ui';
import { DataTableHeaderComponent } from './table/datatable-header.component';
import { FarrisTableColumnDirective } from './datatable-column.component';
import { DataTableBodyComponent } from './table/datatable-body.component';
import { IdService } from './utils/id.service';
import { DataTableService } from './datatable.service';
// import { FarrisCommonModule } from '../../common';
import { DTCheckboxComponent } from './datatable-checkbox.component';

import { DatatableFooterComponent } from './table/datatable-footer.component';
import { FarrisCellTemplateDirective, FarrisEditTemplateDirective } from './datatable-slot.directive';
import { RowDirective } from './datatable-row.component';

import { DragColumnDirective } from './utils/drag.directive';

import { FarrisPageComponent } from './pagination/pagination.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PerfectScrollbarModule,
        PaginationModule,
        // FarrisCommonModule,
        InputsModule,
        DateInputsModule,
        IntlModule,
        FarrisPopoverModule,
        // FarrisPopoverModule,
        // InputGroupModule
    ],
    exports: [DataTableComponent, DataTableHeaderComponent, FarrisTableColumnDirective, DataTableBodyComponent,
        DatatableFooterComponent, FarrisCellTemplateDirective, FarrisEditTemplateDirective,
        RowDirective, DragColumnDirective, FarrisPageComponent],
    declarations: [DataTableComponent, DataTableHeaderComponent, FarrisTableColumnDirective, DragColumnDirective,
        DataTableBodyComponent, DTCheckboxComponent, DatatableFooterComponent, FarrisCellTemplateDirective, FarrisEditTemplateDirective
        , RowDirective,
        FarrisPageComponent],
    providers: [DataTableService, ColumnFormatService, IdService, DateTimeHelperService, NumberHelperService]
})
export class DataTableModule { }
