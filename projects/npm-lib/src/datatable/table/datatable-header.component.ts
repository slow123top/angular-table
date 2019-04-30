import { Component, OnInit, Input, EventEmitter, AfterViewInit, Output, ElementRef, Optional, Renderer2 } from '@angular/core';
import { DataTableColumn, deepCopy, convertColumns } from '../datatable-column';
import { DataTableComponent } from '../datatable.component';
@Component({
    selector: 'datatable-header',
    template: `
    <table class="table"
    [class.table-sm]="size==='small'"
    [class.table-striped]="striped"
    [class.table-bordered]="bordered" style="margin:0">
        <thead class="thead-light">
            <tr>
                <th class="dt-checkbox-cell" *ngIf="!dt.singleSelect" style="width:50px">
                    <dt-checkbox [checked]="isCheckAll" (checkedChange)="onCheckedChange($event)"></dt-checkbox>
                    <span class="column-resize-handler" resize></span>
                </th>
                <th style="width:50px" *ngIf="dt.showLineNumber">
                   #
                   <span class="column-resize-handler" resize></span>
                </th>
                <ng-container *ngFor="let col of columns;let i=index">
                    <th [style.textAlign]="col.align||'left'" [style.width]="col.width+'px'"
                    (click)="sort($event,col)" *ngIf="!col.hidden">
                        {{ col.title }}
                        <i class="iconfont icon-tubiao_jiyao-xiangshang" *ngIf="col.direction==='asc'"></i>
                        <i class="iconfont icon-tubiao_jiyao-xiangxia" *ngIf="col.direction==='desc'"></i>
                        <span class="column-resize-handler" resize></span>
                    </th>
                </ng-container>
            </tr>
        </thead>
    </table>
    `
})
export class DataTableHeaderComponent implements OnInit, AfterViewInit {
    // 是否全选
    isCheckAll = false;
    /* 表格尺寸 */
    get size(): string {
        return this.dt.size;
    }
    /* 表格列数据 */
    get columns(): DataTableColumn[] {
        return this.dt.columns;
    }
    /* 斑马样式 */
    get striped(): boolean {
        return this.dt.striped;
    }
    /* 边框 */
    get bordered(): boolean {
        return this.dt.bordered;
    }
    /* 是否单选 */
    get isSingle(): boolean {
        return this.dt.singleSelect;
    }
    /* checkbox 选中事件传播 */
    @Output() checkedAll = new EventEmitter();
    /* 排序 事件传播 */
    @Output() sortChange = new EventEmitter();

    constructor(public dt: DataTableComponent) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    /* checkbox 事件 */
    onCheckedChange($event: any) {
        this.isCheckAll = $event.checked;
        this.checkedAll.emit($event.checked);
    }
    /* 排序 */
    sort(event: MouseEvent, col: DataTableColumn) {
        this.dt.sortData(event, col);
    }

}
