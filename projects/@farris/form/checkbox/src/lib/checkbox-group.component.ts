import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
// import { RadioService } from './radio.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
@Component({
    selector: 'farris-checkbox-group',
    template: `
    <div class="farris-input-wrap" [class.farris-checkradio-hor]="horizontal">
      <ng-content></ng-content>
    </div>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxGroupComponent),
        multi: true,
    }],
    styles: [],
})
export class CheckboxGroupComponent implements OnInit, ControlValueAccessor {
    /* 初始化 radio 的值 */
    @Input()
    model = [];

    @Input()
    name: string;

    @Input()
    horizontal: boolean;
    @Output()
    modelChange = new EventEmitter<any>();

    subscriber: Function[] = [];

    constructor() {
    }

    ngOnInit() {

    }

    changeModel(value: any) {
        const index = this.model.findIndex(ele => {
            return ele === value;
        });
        // 如果已经选中  则设置为不选中
        if (index > -1) {
            this.model.splice(index, 1);
            return this.modelChange.emit();
        }
        // 如果没有选中  设置为选中
        this.model.push(value);
        // control的值设置为逗号分隔的字符串  便于存储和传递
        this.controlChange(this.model.join());
        this.modelChange.emit();
    }
    writeValue(value: any): void {
        this.model = value
        this.changeModel(this.model)
    }

    registerOnChange(fn: Function): void {
        this.controlChange = fn
    }

    registerOnTouched(fn: Function): void {
        this.controlTouch = fn
    }

    private controlChange: Function = () => { }
    private controlTouch: Function = () => { }

}
