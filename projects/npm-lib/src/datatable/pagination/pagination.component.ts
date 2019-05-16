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

    /* 初始化每页数量 */
    @Input()
    pageSize = 10;

    /* 自定义每页改变的数量 */
    @Input()
    pageSizeCollection: number[] = [10, 20, 30, 40];

    /* 初始化当前索引页 */
    @Input()
    get pageIndex() {
        return this.ngPageIndex;
    }
    set pageIndex(pageIndex) {
        this.ngPageIndex = pageIndex;
    }

    /* 展示的页码个数 */
    @Input()
    displayPages = 4;

    /* 分页组件大小 */
    @Input()
    size: string;


    /* 自定义每页数量集合的开关 */
    @Input()
    enableChangePageSize: boolean;

    /* 自定义跳转页码的开关 */
    @Input()
    enableChangePageIndex: boolean;

    ngPageIndex = 1;

    show = false;
    /* 总页数 */
    get pageCount(): number {
        const mod = this.total % this.pageSize;
        const count = Math.floor(this.total / this.pageSize);
        return mod ? count + 1 : count;
    }

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
        if (this.displayPages >= this.pageCount) {
            return pages;
        }
        // 如果要显示的按钮少于总按钮数
        const displayPages = this.displayPages % 2 ? this.displayPages : this.displayPages - 1;
        const partialPage = Math.floor((displayPages - 1) / 2);
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
        if (len !== this.displayPages) {
            const firstShow = pages.findIndex(ele => {
                return !ele.hidden;
            });
            pages[firstShow - 1 < 0 ? firstShow + len : firstShow - 1].hidden = false;
        }
        return pages;
    }

    /* 广播页码切换事件 */
    @Output() changePage = new EventEmitter();

    /* 广播每页数量改变事件 */
    @Output() changePageSize = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        // 获取页数
        // const mod = this.total % this.pageSize;
        // const count = Math.floor(this.total / this.pageSize);
        // this.pageCount = mod ? count + 1 : count;
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
        if (this.displayPages >= this.pageCount) {
            return false;
        }
        return this.pages.findIndex(ele => {
            return !ele.hidden;
        }) !== 0;
    }

    /* 出现右省略号 */
    hasRightEllipsis() {
        if (this.displayPages >= this.pageCount) {
            return false;
        }
        return this.pages.findIndex(ele => {
            return !ele.hidden;
        }) + this.displayPages !== this.pageCount;
    }

    /* 是否显示下拉 */
    showPageChanger(e: any) {
        e.stopPropagation();
        this.show = !this.show;
    }

    /* 改变分页 */
    changePageSizeEvent(event: any) {
        // this.pageSize = event;
        this.changePageSize.emit({
            pageIndex: this.pageIndex,
            pageSize: event
        });
    }

    /* 失去焦点之后跳转到某一页 */
    jumpPage(event: any) {
        console.log(event);
        this.pageIndex = Number(event.srcElement.value);
        this.changePage.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        });
    }

}
