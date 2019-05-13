import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ny-select',
  template: `
  <div class="ny-select-container" >
    <div (click)="enterFocus($event)">
      <input type="hide"/>
      <div>
        <span>
          {{placeholder}}
        </span>
      </div>
    </div>
    <ul class="ny-select-menu" *ngIf="show">
      <ng-content>
      </ng-content>
    </ul>
  </div>
  `,
  styles: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  /* 禁用 */
  @Input()
  disabled: boolean;

  /* 默认单选 */
  @Input()
  type = 'single';

  /* 输入框背景文字 */
  @Input()
  placeholder = '请选择';

  show = false;
  constructor() { }

  ngOnInit() {
  }

  enterFocus(e: any) {
    e.stopPropagation();
    this.show = !this.show;
  }

}
