import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'ny-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('state', [
      state('true', style({
        opacity: 1,
        height: '*',
        display: 'block',
      })),
      state('false', style({
        opacity: 0,
        height: 0,
        display: 'none',
      })),
      transition('* => *', animate(`250ms ease-in-out`)),
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent implements OnInit {

  @ViewChild('input') inputElement: any;
  @ViewChild('tagsContainer') tagsContainer: any;
  /* 哪些被选中 */
  @Input()
  model = [];

  /* 禁用 */
  @Input()
  disabled: boolean;

  /* 默认单选 */
  @Input()
  multiple = false;

  /* 输入框背景文字 */
  @Input()
  get placeholder() {
    if (this.model.length > 0) {
      return '';
    }
    return this.nyPlaceholder;
  }
  set placeholder(placeholder: string) {
    this.nyPlaceholder = placeholder;
  }

  nyPlaceholder = '请选择';
  show = false;
  inputWidth: number;
  inputHeight: number;
  inputPaddingLeft: number;

  @Output() modelChange = new EventEmitter<any>();

  @Output()
  changeValue = new EventEmitter<any>();

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.inputWidth = this.inputElement.nativeElement.offsetWidth;
    this.inputHeight = this.inputElement.nativeElement.offsetHeight;
    this.inputPaddingLeft = this.inputElement.nativeElement.style.paddingLeft;
  }

  enterFocus(e: any) {
    e.stopPropagation();
    e.srcElement.focus();
    this.show = !this.show;
  }

  /* 关闭标签 */
  closeTag(value: any) {
    const tag = this.model.find(ele => {
      return ele.value === value;
    });
    this.changeModel(tag);
  }

  changeModel(option: any) {
    if (!this.multiple) {
      // 单选
      this.model.splice(0, this.model.length);
      this.model.push(option);
      return;
    } else {
      // 多选
      const index = this.model.findIndex(ele => ele.value === option.value);
      if (index > -1) {
        this.model.splice(index, 1);
      } else {
        this.model.push(option);
      }
    }
    // e.srcElement.selectionStart = 0;
    setTimeout(() => {
      this.updateInputSize();
    }, 0);
  }

  /* 更新input尺寸 */
  updateInputSize() {
    // 找到tags容器
    const tagsContainer = this.tagsContainer.nativeElement;
    const input = this.inputElement.nativeElement;
    // tags容器高度 由所有的tag决定
    const height = tagsContainer.offsetHeight;
    if (!height) {
      this.renderer.setStyle(input, 'height', this.inputHeight + 'px');
      this.renderer.setStyle(input, 'padding-left', 15 + 'px');
      this.renderer.setStyle(input, 'padding-top', 0 + 'px');
      this.renderer.setStyle(input, 'width', this.inputWidth + 'px');
      return;
    }
    const tags = tagsContainer.children;
    const tagsContainerLeft = tagsContainer.getBoundingClientRect().left;
    const lastTagRight = tags[tags.length - 1].getBoundingClientRect().right;
    const lastTagHeight = tags[tags.length - 1].getBoundingClientRect().height;
    if (height > this.inputHeight) {
      this.renderer.setStyle(input, 'height', height + 'px');
    } else {
      this.renderer.setStyle(input, 'height', this.inputHeight + 'px');
    }
    this.renderer.setStyle(input, 'padding-left', lastTagRight - tagsContainerLeft + 'px');
    this.renderer.setStyle(input, 'padding-top', height - lastTagHeight + 'px');
    this.renderer.setStyle(input, 'width', this.inputWidth + 'px');
    input.focus();
  }

  /* 回退删除选中的标签 */
  back(e: any) {
    if (e.keyCode === 8) {
      this.changeModel(this.model[this.model.length - 1]);
    }
  }

}
