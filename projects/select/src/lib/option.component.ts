import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'ny-option',
    template: `
       <li class="ny-select-item" (click)="changeItemEvent($event)">
        {{label}}
       </li>
  `,
    styles: []
})
export class OptionComponent implements OnInit {

    /* 下拉菜单 text */
    @Input()
    label: any;

    /* 下拉菜单标识 */
    @Input()
    value: any;

    /* 切换下拉菜单条目 */
    @Output()
    changeOption = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    changeItemEvent(e) {
        e.stopPropagation();
        // Todo select输入框显示值
        this.changeOption.emit({
            label: this.label,
            value: this.value
        });
    }

}
