import { Directive, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { FarrisColumnTemplateDirective } from './datatable-slot.directive';
@Directive({
    selector: 'data-row'
})
export class RowDirective implements OnInit {
    //    指定模板
    @Input()
    @ContentChild(FarrisColumnTemplateDirective, { read: TemplateRef }) rowTempl: TemplateRef<any>;
    constructor() {
    }
    ngOnInit() {
    }
}
