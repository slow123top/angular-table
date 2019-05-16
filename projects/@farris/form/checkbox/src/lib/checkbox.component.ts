import { Component, OnInit, Input, ElementRef, forwardRef, Output, EventEmitter } from '@angular/core';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
@Component({
  selector: 'farris-checkbox',
  template: `
  <label class="custom-control custom-checkbox">
    <input class="custom-control-input" [name]="name" [value]="label"
    [ngModel]="model" (ngModelChange)="changeModelHandler()" type="checkbox" [disabled]="disabled">
      <span class="custom-control-label">
        <ng-content>
        </ng-content>
      </span>
  </label>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true,
  }],
  styles: []
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

  /* model */
  @Input()
  get model() {
    if (this.hasParent(this.el.nativeElement)) {
      return this.checkbox.model.find(ele => {
        return ele === this.label;
      });
    }
    return this.nyModel;
  };

  set model(model: any) {
    this.nyModel = model;
  }

  /* checkbox值 */
  @Input()
  label: any;

  /* 禁用 */
  @Input()
  disabled: boolean;

  @Output()
  modelChange = new EventEmitter<any>();
  nyModel: any;
  constructor(
    private checkbox: CheckboxGroupComponent,
    private el: ElementRef) { }

  ngOnInit() {
  }

  /* 值传递 */
  changeModelHandler() {
    // 父元素获取label  子元素再从父元素获取model
    if (this.hasParent(this.el.nativeElement)) {
      return this.checkbox.changeModel(this.label);
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

  registerOnChange(fn: any): void {
    this.controlChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.controlTouch = fn;
  }
  private controlChange: Function = () => { }
  private controlTouch: Function = () => { }

}
