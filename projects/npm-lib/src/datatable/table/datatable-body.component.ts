import { Component, OnInit, Input, Output, Optional, ElementRef, Renderer2, AfterViewInit, EventEmitter } from '@angular/core';
import { DataTableColumn, convertColumns } from '../datatable-column';
import { DataTableService } from '../datatable.service';
import { DataTableComponent } from '../datatable.component';
import { ColumnFormatService } from '@farris/ui';
import { sortBy, nextSort } from '../utils/sort';
@Component({
    selector: 'datatable-body',
    template: `
    <table class="table"
    [class.table-sm]="size==='small'"
    [class.table-striped]="striped"
    [class.table-bordered]="bordered">
        <thead>
            <tr>
                <th class="dt-checkbox-cell" *ngIf="!dt.singleSelect" style="width:50px">
                    <dt-checkbox [checked]="isCheckAll" (checkedChange)="onCheckedChange($event)"></dt-checkbox>
                </th>
                <th *ngFor="let col of columns;let i=index" [style.textAlign]="'left'" [style.width]="col.width+'px'"
                (click)="sort($event,col)">
                    <span>{{ col.title }}</span>
                    <i class="iconfont icon-xiangshang" *ngIf="col.sortDir==='asc'"></i>
                    <i class="iconfont icon-xiangxia" *ngIf="col.sortDir==='desc'"></i>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr [ngClass]="createRowClassName(row,rowIndex)" *ngFor="let row of rows ; let rowIndex = index"
            (click)="selectedRow($event,rowIndex,row)"
            [class.selected]="isSelected(row)">
                <td class="dt-checkbox-cell" *ngIf="!dt.singleSelect" style="width:50px">
                    <dt-checkbox [checked]="isSelected(row)" (checkedChange)="onChecked($event, rowIndex, row)"></dt-checkbox>
                </td>
                <td [ngClass]="createCellClassName(getValue(col.field,row),col,colIndex)"
                    *ngFor="let col of columns;let colIndex=index" [style.textAlign]="col.align||'left'" [style.width]="col.width + 'px'">
                    <ng-container *ngIf="!col.cellTempl; else cellTemp">
                        <span *ngIf="col.formatter" [innerHtml]="col.formatter">
                        </span>
                        <span *ngIf="!col.formatter" class="text-truncate">
                              {{ getValue(col.field, row)}}
                        </span>
                    </ng-container>
                    <ng-template #cellTemp [ngTemplateOutlet]="col.cellTempl"
                        [ngTemplateOutletContext]="{ $implicit: row,rowIndex:rowIndex,column:col,columnIndex:colIndex}">
                    </ng-template>
                </td>
            </tr>
        </tbody>
    </table>
    `
})
export class DataTableBodyComponent implements OnInit, AfterViewInit {
    // 排序
    // 列表尺寸
    @Input() size: string;
    // 边框
    @Input() bordered: boolean;
    // 斑马线
    @Input() striped: boolean;
    // 列信息
    @Input() columns: DataTableColumn[];
    // 固定列
    @Input() fixed: string;
    // tslint:disable-next-line:no-input-rename
    // tslint:disable-next-line:no-input-rename
    @Input() rows: any[] = [];
    // 自定义行类
    @Input() rowClassName: (row: any, index: number) => string;
    // 自定义单元格类
    @Input() cellClassName: (value: any, col: any, colIndex: number) => string;
    // tslint:disable-next-line:no-output-rename
    @Output('on-select-row') selectRow: EventEmitter<any> = new EventEmitter<any>();
    @Output() checkedAll = new EventEmitter();
    // tslint:disable-next-line:no-output-rename
    @Output() sortChange: EventEmitter<any> = new EventEmitter<any>();
    data: any;
    sortDir: string;
    // tslint:disable-next-line:no-inferrable-types
    lastRowIndex: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    lastColumnIndex: number = 0;
    boxShadow: string;
    className = {};
    selectedRowIndex = -1;
    isCheckAll = false;
    _selections = {};
    // 已选择的行 默认为空
    get selections(): any {
        if (!this._selections) {
            return;
        }
        const keys = Object.keys(this._selections);
        if (keys.length) {
            if (this.dt.singleSelect) {
                return this._selections;
            } else {
                return keys.map((k) => this._selections[k]);
            }
        }
        return undefined;
    }

    constructor(public el: ElementRef, private dataService: DataTableService, private render: Renderer2,
        @Optional() public dt: DataTableComponent, public colFormatSer: ColumnFormatService) { }

    /**
     * 获取对象中指定字段的值。 field: 可以为带有层级结构的路径，如： user.firstName | name 等
     */
    getValue(field: string, data: any) {
        if (field.indexOf('.') === -1) {
            return data[field];
        } else {
            return field.split('.').reduce((obj, key) => {
                return obj[key];
            }, data) || '';
        }
    }

    ngOnInit() {
        this.dataService.selectedAll.subscribe(allChecked => {
            const idfield = this.idField();
            this.rows.forEach(row => {
                if (allChecked) {
                    this._selections[row[idfield]] = row;
                } else {
                    delete this._selections[row[idfield]];
                }
            });
        });
        // 初始化排序 备份数据
        this.data = JSON.parse(JSON.stringify(this.dt.data));
        // 初始化排序  初始化数据排序
        this.setSortDir();
    }
    ngAfterViewInit() {
    }
    private setSortDir() {
        this.columns.forEach(ele => {
            ele['sortDir'] = undefined;
        });
    }
    private sortable() {
        return !this.dt.sortable || !this.dt.sortSetting;
    }
    // 排序事件 设置下一个排序状态 暴露出API 当前列标识以及下一个排序状态
    sort(event: MouseEvent, column: any) {
        event.preventDefault();
        if (this.sortable() || !column.sortable) {
            return;
        }

        // 获取当前的排序类型  升序 降序 还原  三种状态转换
        const direction = nextSort(column.sortDir);
        // 数据排序
        if (!direction) {
            this.dt.data = JSON.parse(JSON.stringify(this.data));
        } else {
            this.dt.data = sortBy(this.dt.data, [{
                field: column.field,
                dir: direction
            }]);
        }
        this.setSortDir();
        // 排序图标
        column.sortDir = direction;
        // 重置所有列的排序方向
        this.sortChange.emit([{
            field: column.field,
            dir: direction
        }]);
    }
    // 选中行
    selectedRow(event: MouseEvent, index: number, data: any) {
        event.stopPropagation();
        event.preventDefault();
        if (this.dt.singleSelect) {
            if (this.selectedRowIndex !== index) {
                this.selectedRowIndex = index;
                this._selections = data;
                this.dataService.selectedRow.next({ rowIndex: index, rowData: data });
            } else {
                this.selectedRowIndex = -1;
                this._selections = undefined;
                this.dataService.unSelectedRow.next({ rowIndex: index, rowData: data });
            }
        } else {
            const idfield = this.idField();
            if (this.isSelected(data)) {
                delete this._selections[data[idfield]];
                this.dataService.unSelectedRow.next({ rowIndex: index, rowData: data });
            } else {
                this._selections[data[this.idField()]] = data;
                this.dataService.selectedRow.next({ rowIndex: index, rowData: data });
            }
        }
        this.selectRow.emit({
            data: this.selections
        });
    }
    // selection checkout事件
    onCheckedChange($event: any) {
        this.isCheckAll = $event.checked;
        this.checkedAll.emit($event.checked);
    }
    // selection checkout 赋值
    onChecked(event: any, index: number, row: any) {
        const state = event.checked;
        const idfield = this.dt.idField;
        if (state) {
            this._selections[row[idfield]] = row;
            this.dataService.selectedRow.next({ rowIndex: index, rowData: row });
        } else {
            delete this._selections[row[idfield]];
            this.dataService.unSelectedRow.next({ rowIndex: index, rowData: row });
        }
        event.originalEvent.stopPropagation();
    }
    // 获取列表行标识
    private idField() {
        return this.dt.idField;
    }
    // 选中行样式类名赋值
    isSelected(row: any) {
        const idfield = this.idField();
        if (this._selections) {
            if (this.dt.singleSelect) {
                return this._selections === row;
            } else {
                return this._selections[row[idfield]] !== undefined;
            }
        }

        return false;
    }
    // 格式化数据
    formatData(value: any, data: any, formatter: any) {
        return this.colFormatSer.format(value, data, formatter);
    }
    // 添加自定义设置列 单元格类样式
    createRowClassName(row: any, index: number) {
        return this.rowClassName ? this.rowClassName(row, index) : '';
    }
    // 添加自定义单元格或者列样式
    createCellClassName(value: any, col: any, colIndex: number) {
        return this.cellClassName ? this.cellClassName(value, col, colIndex) : '';
    }
}
