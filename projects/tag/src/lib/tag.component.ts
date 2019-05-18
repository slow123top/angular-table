import { Component, Input, ChangeDetectionStrategy, OnInit, EventEmitter, Output } from '@angular/core'
import { SafeStyle, DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'ny-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="'ny-tag' + (type ? ' ny-tag--' + type : '') + (size ? ' ny-tag--' + size : '')"
      [class.is-hit]="hit">
      <ng-content></ng-content>
      <i class="k-icon k-i-close-circle" *ngIf="closable" (click)="close.emit(value)"></i>
    </span>
  `,
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @Input() type: string;        // enum: primary/gray/success/warning/danger
  @Input() closable = false;
  @Input() hit = false;
  @Input() color: string;
  @Input() size: string;

  @Input()
  value: any;

  @Output()

  close: EventEmitter<any> = new EventEmitter<any>();

  tagStyles: SafeStyle;

  constructor(
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    const styles = `backgroundColor: ${this.color}`;
    this.tagStyles = this.sanitizer.bypassSecurityTrustStyle(styles);
  }

}
