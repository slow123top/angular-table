import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SelectComponent } from './select.component';
@Component({
    selector: 'ny-option',
    template: `
       <li class="my-dropdown-list-item" [class.selected]="active" (click)="changeItemEvent($event)">
        {{label}}
       </li>
  `,
    styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

    /* 下拉菜单 text */
    @Input()
    label: any;

    /* 下拉菜单标识 */
    @Input()
    value: any;

    get active() {
        const index = this.selectComponent.model.findIndex(ele => ele.value === this.value);
        return index > -1 ? true : false;
    }

    /* 切换下拉菜单条目 */
    @Output()
    changeOption = new EventEmitter();

    constructor(private selectComponent: SelectComponent) { }

    ngOnInit() {
    }

    changeItemEvent(e: any) {
        e.stopPropagation();
        this.selectComponent.changeModel({ label: this.label, value: this.value });
        // Todo select输入框显示值
        this.selectComponent.changeValue.emit(this.selectComponent.model);
    }

}
