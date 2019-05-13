import { Component, OnInit, Input, EventEmitter, ElementRef } from '@angular/core';
import { CheckboxGroupComponent } from './checkbox-group.component';
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
  styles: []
})
export class CheckboxComponent implements OnInit {

  /* model */
  @Input()
  get model() {
    if (this.hasParent(this.el.nativeElement)) {
      return this.checkboxSer.model.find(ele => {
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

  nyModel: any;
  constructor(private checkboxSer: CheckboxGroupComponent,
    private el: ElementRef) { }

  ngOnInit() {
  }

  /* 值传递 */
  changeModelHandler() {
    this.checkboxSer.changeModel(this.model);
  }


  /* 是否存在父元素  存在即单选组*/
  hasParent(element: any) {
    return element.parentElement.classList.contains('farris-input-wrap');
  }
}
