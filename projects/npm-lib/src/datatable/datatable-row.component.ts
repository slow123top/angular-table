import { Directive, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { FarrisCellTemplateDirective } from './datatable-slot.directive';
@Directive({
    selector: 'data-row'
})
export class RowDirective implements OnInit {
    //    指定模板
    @Input()
    @ContentChild(FarrisCellTemplateDirective, { read: TemplateRef }) rowTempl: TemplateRef<any>;
    constructor() {
    }
    ngOnInit() {
    }
}
