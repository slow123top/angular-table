import { Directive, OnInit, Input, ContentChild, TemplateRef, ElementRef, HostBinding } from '@angular/core';
import { FarrisCellTemplateDirective, FarrisEditTemplateDirective } from './datatable-slot.directive';
@Directive({
    selector: 'farris-table-column'
})
export class FarrisTableColumnDirective implements OnInit {

    @Input() title: string;
    @Input() field: string;
    @Input() width: number;
    @Input() align?: 'left' | 'center' | 'right';
    @Input() fixed?: any;
    @Input() className?: string;
    @Input() media?: object;
    @Input() sortable?: boolean;
    @Input() hidden?: boolean;
    @Input() formatter?: (param: any) => {};
    // tslint:disable-next-line:no-inferrable-types
    @Input() multipleFilter?: boolean = true;
    @Input() filter?: any;
    @HostBinding('class.fixed') fixedClass = this.fixed === 'left';
    //    指定模板
    @Input()
    /* 非编辑模板 */
    @ContentChild(FarrisCellTemplateDirective, { read: TemplateRef }) cellTempl?: TemplateRef<any>;

    /* 编辑模板 */
    @ContentChild(FarrisEditTemplateDirective, { read: TemplateRef }) editTempl?: TemplateRef<any>;

    constructor(private el: ElementRef) {

    }

    ngOnInit() { }
}
