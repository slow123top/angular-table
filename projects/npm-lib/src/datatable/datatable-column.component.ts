import { Directive, OnInit, Input, ContentChild, TemplateRef, ElementRef, HostBinding } from '@angular/core';
import { FarrisColumnTemplateDirective } from './datatable-slot.directive';
@Directive({
    selector: 'farris-table-column'
})
export class FarrisTableColumnDirective implements OnInit {

    @Input() edit: string;
    @Input() title: string;
    @Input() field: string;
    @Input() width: number;
    @Input() align: 'left' | 'center' | 'right';
    @Input() fixed?: any;
    @Input() className?: string;
    @Input() media?: object;
    @Input() sortable?: boolean;
    @Input() formatter?: (param: any) => {};
    // tslint:disable-next-line:no-inferrable-types
    @Input() multipleFilter?: boolean = true;
    @Input() filter?: any;
    @HostBinding('class.fixed') fixedClass = this.fixed === 'left';
    //    指定模板
    @Input()
    @ContentChild(FarrisColumnTemplateDirective, { read: TemplateRef }) cellTempl: TemplateRef<any>;

    constructor(private el: ElementRef) {

    }

    ngOnInit() { }
}
