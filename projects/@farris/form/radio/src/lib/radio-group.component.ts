import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { RadioService } from './radio.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
@Component({
    selector: 'farris-radio-group',
    template: `
    <div class="farris-input-wrap" [class.farris-checkradio-hor]="horizontal">
      <ng-content></ng-content>
    </div>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioGroupComponent),
        multi: true,
    }],
    styles: [],
})
export class RadioGroupComponent implements OnInit, ControlValueAccessor {
    /* 初始化 radio 的值 */
    @Input()
    model: any;

    @Input()
    name: string;

    @Input()
    horizontal: boolean;
    @Output()
    modelChange = new EventEmitter<any>();

    subscriber: Function[] = [];

    constructor(private radioSer: RadioService) {
    }

    ngOnInit() {

    }

    changeModel(value: any) {
        this.radioSer.changeRadioValue.subscribe(value => {
            this.model = value;
            this.modelChange.emit();
            this.controlChange(value);
            this.subscriber.forEach(ele => ele());
        })
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
