import { Component, Input, ChangeDetectionStrategy, OnInit, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'ny-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="k-button k-flat border-0" [class.k-primary]="active" (click)="changeValueHandler()" (blur)="blurHandler($event)">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @Input()
  active: boolean;
  /* 标识 */
  @Input()
  value: any;

  @Input()
  type: string;        // enum: primary/gray/success/warning/danger

  @Input()
  closable = false;

  @Input()
  hit = false;

  @Input()
  color: string;

  @Input()
  size: string;

  @Output()
  close = new EventEmitter<any>();

  @Output()
  changeValue = new EventEmitter<any>();

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  /* change tag页签的事件 */
  changeValueHandler() {
    this.active = true;
    this.changeValue.emit(this.value);
  }

  /* 按钮失去焦点 */
  blurHandler(e: any) {
    const srcElement = e.srcElement;
    if (srcElement.classList) {

    }
    this.active = false;
  }

}
