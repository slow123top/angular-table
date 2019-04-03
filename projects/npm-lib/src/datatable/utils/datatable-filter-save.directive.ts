import { Directive, Input, NgZone, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { DataTableComponent } from '../datatable.component';
@Directive({
    selector: '[farris-filter-save]'
})
export class FarrisFilterSaveDirective implements OnInit, AfterViewInit {
    // 多选使用
    @Input() column: any;
    @Input() filters: any;
    constructor(public dt: DataTableComponent, public ngZone: NgZone) {
    }
    // 当组件存在时 就要获取焦点
    ngOnInit() {
    }
    ngAfterViewInit() {

    }
    @HostListener('click')
    changeFilter() {
        // 用户选中的某些行
        // 多选选择选中的checkbox
        const checkedFilters = this.filters.filter(item => {
            return item.value;
        });
        this.dt.resetData();
        const tempArr = [];
        for (const checkedFilter of checkedFilters) {
            for (const dataItem of this.dt.data) {
                if (this.column.filterMethod(checkedFilter.label, dataItem)) {
                    tempArr.push(dataItem);
                }
            }
        }

        this.dt.changeFilterData(tempArr);
    }
}
