import { Component, OnInit, Input, EventEmitter, AfterViewInit, Output, ElementRef, Optional, Renderer2 } from '@angular/core';
import { DataTableColumn, deepCopy, convertColumns } from '../datatable-column';

@Component({
    selector: 'datatable-header',
    template: `
    <table class="table"
    [class.table-sm]="size==='small'"
    [class.table-striped]="striped"
    [class.table-bordered]="bordered"
    >
        <thead>
            <tr>
                <th class="dt-checkbox-cell" *ngIf="!singleSelect">
                    <dt-checkbox [checked]="isCheckAll" (checkedChange)="onCheckedChange($event)"></dt-checkbox>
                </th>
                <th *ngFor="let col of columns;let i=index" [style.textAlign]="col.align" [style.width]="col.width+'px'">
                    <span>{{ col.title }}</span>
                </th>
            </tr>
        </thead>
    </table>
    `
})
export class DataTableHeaderComponent implements OnInit, AfterViewInit {
    @Input() striped: boolean;
    @Input() bordered: boolean;
    @Input() size: string;
    @Input() hover: boolean;
    @Input() columns: DataTableColumn[] = [];
    @Input() singleSelect = true;
    @Input() fixed: string;
    // 数据排序使用
    @Input() rows: any;
    // 恢复源数据使用
    @Input() data: any;
    @Input() rowClassName: (row: any, index: number) => string;
    @Output() checkedAll = new EventEmitter();
    @Output('on-sort-change') onSortChange = new EventEmitter<any>();
    @Output() rowsChange = new EventEmitter<any>();
    sortType = {};
    filterFields = {};
    clickedUp = false;
    clickedDown = false;
    copyColumns: any;
    copyRows: any;
    originRows: any;
    isCheckAll = false;
    allClass = ' ';
    constructor(public el: ElementRef) {
        this.allClass += this.el.nativeElement.classList.value;
    }
    width = '100%';
    ngOnInit() {
        if (this.fixed === 'left') {
            this.columns = convertColumns(this.columns, 'left');
        }
        if (this.fixed === 'right') {
            this.columns = convertColumns(this.columns, 'right');
        }
    }
    ngAfterViewInit() {
    }

    onCheckedChange($event: any) {
        this.isCheckAll = $event.checked;
        this.checkedAll.emit($event.checked);
    }
    createRowClassName(row: any, index: number) {
        return this.rowClassName ? this.rowClassName(row, index) : '';
    }
    sortChange(event: any) {
        this.onSortChange.emit(event);
    }

    deepCopyData() {
        const copyColumns = deepCopy(this.columns);
        const copyRows = deepCopy(this.rows);
        copyColumns.forEach(element => {
            element.sortType = 'normal';
        });
        return {
            [copyColumns]: copyColumns,
            [copyRows]: copyRows
        };
    }
    /* 若存在筛选条件 保存按钮可点击
     */
    hasChecked(col: any) {
        if (this.filterFields.hasOwnProperty(col.field)) {
            this.filterFields[col.field].some(ele => {
                return ele.checked;
            });
        }
        return false;
    }

}
