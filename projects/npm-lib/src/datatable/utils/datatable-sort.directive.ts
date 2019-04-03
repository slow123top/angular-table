import { Directive, Input, ElementRef, NgZone, OnInit, HostListener, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DataTableComponent } from '../datatable.component';
@Directive({
    selector: '[farris-sort]'
})
export class FarrisSortDirective implements OnInit, AfterViewInit {
    @Input() column: any;
    @Input() sortType: any;
    count = 0;
    // tslint:disable-next-line:no-output-rename
    @Output('on-sort-change') sortChange: EventEmitter<any> = new EventEmitter<any>();
    constructor(public dt: DataTableComponent, private el: ElementRef, public ngZone: NgZone) {
    }
    // 当组件存在时 就要获取焦点
    ngOnInit() {
        this.el.nativeElement.focus();
    }
    ngAfterViewInit() {

    }
    @HostListener('click')
    onClickHeaderTh() {
        if (!this.column.sortable) {
            return;
        }
        this.count++;
        this.dt.sortData(this.count, this.column, this.sortType);
        console.log(this.sortType);
        this.sortChange.emit({
            column: this.column,
            key: this.column.field,
            type: this.sortType[this.column.field],
        });
    }
}
