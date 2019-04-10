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
    NumberHelperService, FDropdownDirectiveTypeModule
} from '@farris/ui';
import { DataTableHeaderComponent } from './table/datatable-header.component';
import { FarrisTableColumnDirective } from './datatable-column.component';
import { DataTableBodyComponent } from './table/datatable-body.component';
import { IdService } from './utils/id.service';
import { DataTableService } from './datatable.service';
// import { FarrisCommonModule } from '../../common';
import { DTCheckboxComponent } from './datatable-checkbox.component';

import { DatatableFooterComponent } from './table/datatable-footer.component';
import { FarrisColumnTemplateDirective } from './datatable-slot.directive';
import { RowDirective } from './datatable-row.component';

import { DragColumnDirective } from './utils/drag.directive';

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
        DatatableFooterComponent, FarrisColumnTemplateDirective, RowDirective, DragColumnDirective],
    declarations: [DataTableComponent, DataTableHeaderComponent, FarrisTableColumnDirective, DragColumnDirective,
        DataTableBodyComponent, DTCheckboxComponent, DatatableFooterComponent, FarrisColumnTemplateDirective, RowDirective],
    providers: [DataTableService, ColumnFormatService, IdService, DateTimeHelperService, NumberHelperService]
})
export class DataTableModule { }
