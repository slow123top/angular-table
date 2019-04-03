import { Directive, Input, ElementRef, NgZone, OnInit, HostListener, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DataTableComponent } from '../datatable.component';
@Directive({
    selector: '[farris-edit-focus]'
})
export class FarrisEditFocusDirective implements OnInit, AfterViewInit {
    @Input() column: any;
    constructor(public dt: DataTableComponent, private el: ElementRef, public ngZone: NgZone) {
    }
    // 当组件存在时 就要获取焦点
    ngOnInit() {
        this.el.nativeElement.focus();
    }
    ngAfterViewInit() {

    }
}
