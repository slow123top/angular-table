import { Directive, ElementRef, NgZone, Renderer2, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { DataTableComponent } from '../datatable.component';
@Directive({
    selector: '[editCell]'
})
export class EditCellDirective {
    constructor() {

    }

    // @HostListener('window:click', ['$event'])
    // closeCellHandler(e: MouseEvent) {

    // }


    // @HostListener('click',['$event'])

}
