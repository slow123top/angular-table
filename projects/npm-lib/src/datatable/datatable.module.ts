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
import { SlotDirective } from './datatable-slot.directive';
import { RowDirective } from './datatable-row.component';

import { DragColumnDirective } from './utils/drag.directive';
import { FarrisColumnResDirective } from './utils/datatable-responsive.directive';
import { FarrisHoverDirective } from './utils/datatable-hover.directive';
import { FarrisEditFocusDirective } from './utils/datatable-edit-focus.directive';
import { FarrisEditEventDirective } from './utils/datatable-edit-event.directive';
import { FarrisSortDirective } from './utils/datatable-sort.directive';
import { FarrisFilterDirective } from './utils/datatable-filter.directive';
import { FarrisFilterSaveDirective } from './utils/datatable-filter-save.directive';
import { FarrisFilterResetDirective } from './utils/datatable-filter-reset.directive';
import { FarrisFilterSingleDirective } from './utils/datatable-filter-single.directive';
import { DateFormatPipe } from './utils/datatable-date-format.pipe';

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
        DatatableFooterComponent, SlotDirective, RowDirective, DragColumnDirective,
        FarrisColumnResDirective, FarrisHoverDirective, FarrisEditFocusDirective, FarrisEditEventDirective,
        DateFormatPipe, FarrisSortDirective, FarrisFilterDirective, FarrisFilterSaveDirective,
        FarrisFilterResetDirective, FarrisFilterSingleDirective],
    declarations: [DataTableComponent, DataTableHeaderComponent, FarrisTableColumnDirective, DragColumnDirective,
        DataTableBodyComponent, DTCheckboxComponent, DatatableFooterComponent, SlotDirective, RowDirective,
        FarrisColumnResDirective, FarrisHoverDirective, FarrisEditFocusDirective, FarrisEditEventDirective,
        DateFormatPipe, FarrisSortDirective, FarrisFilterDirective, FarrisFilterSaveDirective,
        FarrisFilterResetDirective, FarrisFilterSingleDirective],
    providers: [DataTableService, ColumnFormatService, IdService, DateTimeHelperService, NumberHelperService]
})
export class DataTableModule { }
