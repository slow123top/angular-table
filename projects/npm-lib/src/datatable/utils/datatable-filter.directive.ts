import { Directive, Input, NgZone, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { DataTableComponent } from '../datatable.component';
@Directive({
    selector: '[farris-filter]'
})
export class FarrisFilterDirective implements OnInit, AfterViewInit {

    @Input() column: any;
    // tslint:disable-next-line:no-output-rename
    constructor(public dt: DataTableComponent, public ngZone: NgZone) {
    }
    // 当组件存在时 就要获取焦点
    ngOnInit() {
    }
    ngAfterViewInit() {

    }
    @HostListener('click')
    onClickHeaderTh() {
        if (!this.column.filterable) {
            return;
        }
    }
}
