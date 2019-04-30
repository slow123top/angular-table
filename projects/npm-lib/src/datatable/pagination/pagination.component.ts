import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'farris-page',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})

export class FarrisPageComponent implements OnInit {

    /* 分页信息 数据量 每页数据  当前索引页   */
    @Input() total: number;
    @Input() pageSize = 10;
    @Input() pageIndex = 1;

    /* 总是展示的页码个数 */
    @Input() buttonCount = 5;

    /* 分页大小 */
    @Input() size: string;
    pageCount: number;
    pages = [];

    /* 广播页码切换事件 */
    @Output() changePage = new EventEmitter();
    constructor() {

    }

    ngOnInit() {
        // 获取页数
        const mod = this.total % this.pageSize;
        const count = Math.floor(this.total / this.pageSize);
        this.pageCount = mod ? count + 1 : count;
        // 页码集合
        this.pages = new Array(this.pageCount).fill(0).map((ele: any, index: number) => {
            return index + 1;
        });
    }


    changePageEvent(index: number) {
        if (index < 0) {
            /* 上一页按钮 */
            this.pageIndex = this.clickPrevious();
        } else if (index === this.pageCount + 1) {
            /* 下一页按钮 */
            this.pageIndex = this.clickNext();
        } else {
            /* 页码 */
            this.pageIndex = index;
        }
        this.changePage.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        });
    }

    /* 上一页 */
    clickPrevious() {

        return this.pageIndex - 1;
    }

    /* 下一页 */
    clickNext() {
        return this.pageIndex + 1;
    }

    /* 出现省略号的情况 */

    hasEllipsis() {
        return this.pageCount > this.buttonCount;
    }

    hasLeftEllipsis() {
    }

}
