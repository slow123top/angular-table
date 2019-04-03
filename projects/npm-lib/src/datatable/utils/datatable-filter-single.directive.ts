import { Directive, Input, NgZone, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { DataTableComponent } from '../datatable.component';
@Directive({
    selector: '[farris-filter-single]'
})
export class FarrisFilterSingleDirective implements OnInit, AfterViewInit {
    @Input() column: any;
    @Input() filter: any;
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
        this.dt.resetData();
        const filteredData = this.dt.data.filter(item => {
            return this.column.filterMethod(this.filter.value, item);
        });
        this.dt.changeFilterData(filteredData);
    }
}
