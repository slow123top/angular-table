import { Component, OnInit, Input, Output, EventEmitter, Optional, ElementRef, forwardRef } from '@angular/core';

import { RadioGroupComponent } from './radio-group.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'farris-radio',
  template: `
  <label class="custom-control custom-radio">
      <input class="custom-control-input" [name]="name" [value]="label" 
      [ngModel]="model" (ngModelChange)="changeModelHandler()" type="radio" [disabled]="disabled">
      <span class="custom-control-label">
        <ng-content>
        </ng-content>
      </span>
  </label>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent),
    multi: true,
  }],
  styles: []
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  /* radio 原生name 用于多个radio单选使用 */
  get name() {
    if (this.hasParent(this.el.nativeElement)) {
      return this.radioGroup.name;
    }
    return '';
  }

  /* radio 值 */
  @Input()
  get model(): any {
    if (this.hasParent(this.el.nativeElement)) {
      return this.radioGroup.model;
    }
    return this.nyModel;
  }

  set model(model: any) {
    this.nyModel = model;
  }


  @Input()
  id: string;

  /* radio 值 */
  @Input()
  label: any = '';

  /* 禁用 */
  @Input()
  disabled: boolean;

  nyModel: any;

  @Output()
  modelChange = new EventEmitter<any>();

  constructor(
    @Optional() private radioGroup: RadioGroupComponent,
    private el: ElementRef
  ) {
  }

  ngOnInit() {
  }

  changeModelHandler() {
    // 父元素获取label  子元素再从父元素获取model
    if (this.hasParent(this.el.nativeElement)) {
      return this.radioGroup.changeModel(this.label);
    }
    this.model = this.label;
    this.modelChange.emit(this.model);
    this.controlChange(this.label);
  }

  /* 是否存在父元素  存在即单选组*/
  hasParent(element: any) {
    return element.parentElement.classList.contains('farris-input-wrap');
  }

  writeValue(value: any): void {
    this.model = value;
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
