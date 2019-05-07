import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Page, PaginationSetting } from './pagination';
@Component({
    selector: 'farris-page',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})

export class FarrisPageComponent implements OnInit {

    /* 分页配置 */

    @Input()
    paginantion: PaginationSetting;

    /*分页数据总数 */
    @Input()
    total: number;

    /* 每页数量 */
    @Input()
    pageSize = 10;

    /* 当前索引页 */
    @Input()
    get pageIndex() {
        return this.ngPageIndex;
    }
    set pageIndex(pageIndex) {
        this.ngPageIndex = pageIndex;
    }

    /* 展示的页码个数 */
    @Input()
    showPages = 4;

    /* 分页组件大小 */
    @Input()
    size: string;

    /*  */
    @Input()
    showJumpPage: boolean;

    ngPageIndex = 1;
    /* 总页数 */
    pageCount: number;
    /* 自定义要显示的页数 */
    get pages(): Page[] {
        // 初始化分页
        const pages = new Array(this.pageCount).fill(0).map((ele: any, index: number) => {
            return {
                id: index,
                label: index + 1,
                hidden: false
            };
        });
        if (this.showPages >= this.pageCount) {
            return pages;
        }
        // 如果要显示的按钮少于总按钮数
        const showPages = this.showPages % 2 ? this.showPages : this.showPages - 1;
        const partialPage = Math.floor((showPages - 1) / 2);
        pages.forEach(page => {
            if (Math.abs(page.label - this.pageIndex) > partialPage) {
                page.hidden = true;
            }
        });

        // 如果快跑跑到页尾了
        if (this.pageIndex + partialPage > this.pageCount) {
            const pre = this.pageIndex + partialPage - this.pageCount;
            const leftPageIndex = pages.findIndex(ele => {
                return !ele.hidden;
            });
            for (let i = leftPageIndex - pre; i < leftPageIndex; i++) {
                pages[i].hidden = false;
            }
        }

        // 如果快跑到第一页了
        if (this.pageIndex - partialPage < 1) {
            const next = partialPage - (this.pageIndex - 1);
            const rightPageIndex = pages.findIndex(ele => {
                return ele.hidden;
            });
            for (let i = rightPageIndex; i < rightPageIndex + next; i++) {
                pages[i].hidden = false;
            }
        }
        // 显示的按钮总数目必须等于showPages
        const len = pages.filter(ele => {
            return !ele.hidden;
        }).length;
        if (len !== this.showPages) {
            const firstShow = pages.findIndex(ele => {
                return !ele.hidden;
            });
            pages[firstShow - 1 < 0 ? firstShow + len : firstShow - 1].hidden = false;
        }
        return pages;
    }

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

    /* 出现左省略号 */

    hasLeftEllipsis() {
        return this.pages.findIndex(ele => {
            return !ele.hidden;
        }) !== 0;
    }

    /* 出现右省略号 */
    hasRightEllipsis() {

        return this.pages.findIndex(ele => {
            return !ele.hidden;
        }) + this.showPages !== this.pageCount;
    }

}
