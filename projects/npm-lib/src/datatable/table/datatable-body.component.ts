import { Component, OnInit, Input, Output, Optional, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { DataTableColumn } from '../datatable-column';
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
        <tbody>
            <tr [ngClass]="createRowClassName(row,rowIndex)" *ngFor="let row of rows ; let rowIndex = index"
            (click)="selectedRow($event,rowIndex,row)"
            [class.selected]="isSelected(row)">
                <td class="dt-checkbox-cell" *ngIf="!dt.singleSelect" style="width:50px">
                    <dt-checkbox [checked]="isSelected(row)" (checkedChange)="onChecked($event, rowIndex, row)"></dt-checkbox>
                </td>
                <td style="width:50px"  *ngIf="dt.showLineNumber">
                   <span>{{rowIndex+1}}</span>
                </td>
                <ng-container *ngFor="let col of columns;let colIndex=index">
                    <td [ngClass]="createCellClassName(getValue(col.field,row),col,colIndex)" [style.textAlign]="col.align||'left'"
                    [style.width]="col.width + 'px'" *ngIf="!col.hidden">
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
                </ng-container>
            </tr>
        </tbody>
    </table>
    `
})
export class DataTableBodyComponent implements OnInit, AfterViewInit {

    /* 自定义行类样式 */
    @Input()
    rowClassName: (row: any, index: number) => string;

    /* 自定义单元格样式 */
    @Input()
    cellClassName: (value: any, col: any, colIndex: number) => string;

    /* 表格尺寸 */
    get size(): string {
        return this.dt.size;
    }

    /* 边框 */
    get bordered(): boolean {
        return this.dt.bordered;
    }

    /* 斑马样式 */
    get striped(): boolean {
        return this.dt.striped;
    }

    // 列信息
    get columns(): DataTableColumn[] {
        return this.dt.columns;
    }

    @Input() rows: any[] = [];
    // tslint:disable-next-line:no-output-rename
    @Output('on-select-row') selectRow: EventEmitter<any> = new EventEmitter<any>();
    // tslint:disable-next-line:no-output-rename

    data: any;
    // tslint:disable-next-line:no-inferrable-types
    lastRowIndex: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    lastColumnIndex: number = 0;
    selectedRowIndex = -1;
    isCheckAll = false;
    tempSelections = {};
    // 已选择的行 默认为空
    get selections(): any {
        if (!this.tempSelections) {
            return;
        }
        const keys = Object.keys(this.tempSelections);
        if (keys.length) {
            if (this.dt.singleSelect) {
                return this.tempSelections;
            } else {
                return keys.map((k) => this.tempSelections[k]);
            }
        }
        return undefined;
    }

    constructor(
        public el: ElementRef,
        private dataService: DataTableService,
        @Optional() public dt: DataTableComponent,
        public colFormatSer: ColumnFormatService) { }

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
                    this.tempSelections[row[idfield]] = row;
                } else {
                    delete this.tempSelections[row[idfield]];
                }
            });
        });
    }
    ngAfterViewInit() {
    }



    // 选中行
    selectedRow(event: MouseEvent, index: number, data: any) {
        event.stopPropagation();
        event.preventDefault();
        if (this.dt.singleSelect) {
            if (this.selectedRowIndex !== index) {
                this.selectedRowIndex = index;
                this.tempSelections = data;
                this.dataService.selectedRow.next({ rowIndex: index, rowData: data });
            } else {
                this.selectedRowIndex = -1;
                this.tempSelections = undefined;
                this.dataService.unSelectedRow.next({ rowIndex: index, rowData: data });
            }
        } else {
            const idfield = this.idField();
            if (this.isSelected(data)) {
                delete this.tempSelections[data[idfield]];
                this.dataService.unSelectedRow.next({ rowIndex: index, rowData: data });
            } else {
                this.tempSelections[data[this.idField()]] = data;
                this.dataService.selectedRow.next({ rowIndex: index, rowData: data });
            }
        }
        this.selectRow.emit({
            data: this.selections
        });
    }
    // selection checkout 赋值
    onChecked(event: any, index: number, row: any) {
        const state = event.checked;
        const idfield = this.dt.idField;
        if (state) {
            this.tempSelections[row[idfield]] = row;
            this.dataService.selectedRow.next({ rowIndex: index, rowData: row });
        } else {
            delete this.tempSelections[row[idfield]];
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
        if (this.tempSelections) {
            if (this.dt.singleSelect) {
                return this.tempSelections === row;
            } else {
                return this.tempSelections[row[idfield]] !== undefined;
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
