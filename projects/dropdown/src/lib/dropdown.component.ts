import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ny-dropdown',
  template: `
  <div class="dropdown w-100" (click)="clickDropdownMenu($event)" (mouseover)="hoverDropdownEvent($event)">
    <span class="btn btn-secondary dropdown-toggle" [class.btn-sm]="size==='small'">
      {{title}}
    </span>
    <div class="dropdown-menu" [class.show]="show">
      <a class="dropdown-item" (click)="changeItemEvent(item)" *ngFor="let dropdownItem of dropdownItems">
          {{dropdownItem}}
      </a>
    </div>
  </div>
  `,
  styles: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class DropdownComponent implements OnInit {

  /* 下拉框名称 */
  @Input()
  title = '下拉框';

  /* 触发类型 */
  @Input()
  trigger = 'click';
  /* 下拉框大小 */
  @Input()
  size = 'small';

  /* 子元素 */
  @Input()
  dropdownItems: [];

  /* 改变dropItem */
  @Output()
  changeItem = new EventEmitter();

  show = false;
  constructor() { }

  ngOnInit() {

  }

  changeItemEvent(item: any) {
    this.changeItem.emit(item);
  }
  clickDropdownMenu(e: any) {
    e.stopPropagation();
    if (this.trigger === 'click') {
      this.show = !this.show;
    }
  }
  hoverDropdownEvent(e: any) {
    e.stopPropagation();
    if (this.trigger === 'hover') {
      this.show = !this.show;
    }
  }

}
