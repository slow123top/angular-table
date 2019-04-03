import { Directive, Input, NgZone, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { DataTableComponent } from '../datatable.component';
@Directive({
    selector: '[farris-filter-reset]'
})
export class FarrisFilterResetDirective implements OnInit, AfterViewInit {
    @Input() column: any;
    constructor(public dt: DataTableComponent, public ngZone: NgZone) {
    }
    // 当组件存在时 就要获取焦点
    ngOnInit() {
    }
    ngAfterViewInit() {

    }
    @HostListener('click')
    saveFilterData() {
        // 用户选中的某些行
        this.dt.resetData();
        // this.filterChange.emit(this.filterFields);
    }
}
