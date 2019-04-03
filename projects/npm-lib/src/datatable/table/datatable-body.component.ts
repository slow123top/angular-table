import { Component, OnInit, Input, Output, Optional, ElementRef, Renderer2, AfterViewInit, EventEmitter } from '@angular/core';
import { DataTableColumn, convertColumns } from '../datatable-column';
import { DataTableService } from '../datatable.service';
import { DataTableComponent } from '../datatable.component';
import { ColumnFormatService } from '@farris/ui';

@Component({
    selector: 'datatable-body',
    template: `
    <table class="table"
    [class.table-sm]="size==='small'"
    [class.table-striped]="striped"
    [class.table-bordered]="bordered">
        <thead>
            <tr>
                <th class="dt-checkbox-cell" *ngIf="!dt.singleSelect">
                    <dt-checkbox [checked]="isCheckAll" (checkedChange)="onCheckedChange($event)"></dt-checkbox>
                </th>
                <th *ngFor="let col of columns;let i=index" [style.textAlign]="col.align||'left'" [style.width]="col.width+'px'">
                    <span>{{ col.title }}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr [ngClass]="createRowClassName(row,rowIndex)"
                *ngFor="let row of rows ; let rowIndex = index"
                 [class.selected]="isSelected(row)">
                <td class="dt-checkbox-cell" *ngIf="!dt.singleSelect">
                        <dt-checkbox [checked]="isSelected(row)" (checkedChange)="onChecked($event, rowIndex, row)"></dt-checkbox>
                </td>
                <td [ngClass]="getTdClassName(row[col.field],col)"
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
    `,
    styles: [
        `
        .table td:focus-within{
            box-shadow:inset 0 0 0 2px rgba(0,0,0,.13);
        }
        .table td div{
            width:100%;
            height:100%;
        }
        .table td input{
            width:100%;
            height:100%;
            font-family:auto;
            line-height:1;
            font-size:13px;
        }
        .table td input:focus{
            border:0;
        }
        input[type="checkbox"]:focus{
            outline:none;
        }
        `
    ]
})
export class DataTableBodyComponent implements OnInit, AfterViewInit {
    @Input() size: string;
    @Input() hover: boolean;
    @Input() bordered: boolean;
    @Input() striped: boolean;
    @Input() columns: DataTableColumn[];
    @Input() fixed: string;
    // tslint:disable-next-line:no-input-rename
    // tslint:disable-next-line:no-input-rename
    @Input() rows: any[] = [];
    @Input() rowClassName: (row: any, index: number) => string;
    @Input() cellClassName: (value: any, col: any) => string;
    // tslint:disable-next-line:no-output-rename
    @Output('on-select-row') selectRow: EventEmitter<any> = new EventEmitter<any>();
    // tslint:disable-next-line:no-output-rename
    @Output('on-edit-grid') cellEdit: EventEmitter<any> = new EventEmitter<any>();
    // tslint:disable-next-line:no-inferrable-types
    lastRowIndex: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    lastColumnIndex: number = 0;
    boxShadow: string;
    _rows: any;
    edit = {};
    className = {};
    isRowTempl = false;
    selectedRowIndex = -1;
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
        if (this.rows) {
            this.isRowTempl = this.rows.some(row => {
                return row.hasOwnProperty('rowTempl');
            });
        }
        if (this.fixed === 'left') {
            this.columns = convertColumns(this.columns, 'left');
        }
        if (this.fixed === 'right') {
            this.columns = convertColumns(this.columns, 'right');
        }
    }
    ngAfterViewInit() {
        this._rows = this.el.nativeElement.querySelectorAll('tr');
    }
    selectedRow(event, index: number, data: any) {

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

    private idField() {
        return this.dt.idField;
    }

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

    formatData(value: any, data: any, formatter: any) {
        return this.colFormatSer.format(value, data, formatter);
    }
    // 添加自定义设置列 单元格类样式
    getTdClassName(value, col) {
        const tempClassName = {};
        // 列类的样式
        if (col.className && Object.prototype.toString.call(col.className) === '[object String]') {
            tempClassName[col.className] = true;
        }
        // 行类的样式
        if (this.cellClassName && this.cellClassName(value, col)) {
            tempClassName[this.cellClassName(value, col)] = true;
        }
        // 定义是否有固定列
        // if (col.hasOwbProperty('fixed')) {
        //     if (col.fixed === 'left' || col.fixed === 'right') {
        //         tempClassName[`td-hidden`] = true;
        //     } else if (col.fixed.type && col.fixed.media) {
        //         tempClassName[`td-${col.fixed.media}-hidden`] = true;
        //     } else {
        //         tempClassName[`td-hidden`] = false;
        //     }
        // }
        return tempClassName;
    }
    createRowClassName(row, index) {
        return this.rowClassName ? this.rowClassName(row, index) : '';
    }
    /**
     * 单元格编辑
     *
     */
    editGrid(rowIndex, columnIndex) {
        this.edit[rowIndex + '-' + columnIndex] = true;
        // focus
    }
    /* 结束编辑 */
    closeEditGrid(rowIndex, columnIndex) {
        this.edit[rowIndex + '-' + columnIndex] = false;
    }
    // 获取td焦点
    focusGrid(rowIndex, columnIndex) {
        this._rows[rowIndex].children[columnIndex].focus();
        if (this.edit[rowIndex + this.columns[columnIndex].field]) {
            this.render.removeStyle(this._rows[rowIndex].children[columnIndex], 'box-shadow');
            return;
        }
        this.render.setStyle(this._rows[rowIndex].children[columnIndex], 'box-shadow', 'inset 0 0 0 2px rgba(0,0,0,.13)');
        this.lastRowIndex = rowIndex;
        this.lastColumnIndex = columnIndex;
    }
    // 失去td焦点
    blurGrid(rowIndex, columnIndex) {
        this._rows[rowIndex].children[columnIndex].blur();
        this.lastRowIndex = rowIndex;
        this.lastColumnIndex = columnIndex;
        this.render.removeStyle(this._rows[rowIndex].children[columnIndex], 'box-shadow');
    }
    /* 增加新行 */
    addRow(columns, data) {
        const emptyDataitem = {};
        columns.forEach((ele, index) => {
            if (ele.edit === 'date') {
                emptyDataitem[ele.field] = new Date();
            } else if (ele.edit === 'text') {
                emptyDataitem[ele.field] = '';
            } else if (ele.edit === 'number') {
                emptyDataitem[ele.field] = 0;
            } else if (ele.edit === 'boolean') {
                emptyDataitem[ele.field] = false;
            }
            // this.edit[0 + '-' + index] = true;
        });
        // this.edit['0-1'] = true;
        // this.edit['0-2'] = true;
        data.push(emptyDataitem);
        console.log(this.edit);
        this.editRow(data.length - 1);
        console.log(this.edit);
    }
    /* 行编辑 */
    editRow(rowIndex) {
        this.columns.forEach((ele, index) => {
            this.edit[rowIndex + '-' + index] = true;
        });
    }
}
