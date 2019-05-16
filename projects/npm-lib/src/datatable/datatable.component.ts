import {
    Component, OnInit, ViewChild, ElementRef, OnChanges, Input, SimpleChanges, ContentChild, TemplateRef,
    QueryList, AfterContentInit, AfterViewInit, ContentChildren, Output, EventEmitter, ViewEncapsulation, OnDestroy
} from '@angular/core';
import { DataTableColumn } from './datatable-column';
import { FarrisTableColumnDirective } from './datatable-column.component';
import { DataTableService } from './datatable.service';
import { DataTableBodyComponent } from './table/datatable-body.component';
import { Subscription } from 'rxjs';
import { IdService } from './utils/id.service';
import { sortData } from './utils/sort';
import { PaginationSetting } from './pagination';
import { FormGroup } from '@angular/forms';
@Component({
    selector: 'farris-table',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit, AfterViewInit {

    // 多选  单选
    @Input() singleSelect = true;

    /* 数据标识 */
    @Input() idField = 'id';

    /* 鼠标悬停高亮 */
    @Input() hover: boolean;

    /* 行斑马线样式 */
    @Input() striped: boolean;

    /* 表格边框 */
    @Input() bordered: boolean;

    /* 表格大小 紧密型还是疏松型*/
    @Input() size: string;

    /* 支持添加行 单元格 类样式 */
    @Input() rowClassName: (row: any, index: number) => string;
    @Input() cellClassName: (value: any, col: any) => string;

    /*列支持排序 */
    @Input() sortType: 'single' | 'multiple';
    @Input() sortable: boolean;
    @Input() sortSetting: any[];

    /* 是否显示行号 */
    @Input() showLineNumber: boolean;

    /* 空数据提示 */
    @Input()
    @ContentChild('noDataText') noDataText: TemplateRef<any>;

    // 列是否支持resize
    @Input() resizable: boolean;

    // table 宽高
    @Input() width: number;
    @Input() height: number;

    // 列 信息
    @Input() columns: DataTableColumn[];

    // 数据
    @Input() data: any[];

    /* 分页 */
    @Input() total: number;
    @Input() pageIndex = 1;
    @Input() pageSize = 10;
    @Input() pageable: boolean;
    @Input()
    showJumpPage: boolean;
    @Input()
    pagination: PaginationSetting;

    /* 表格form */
    @Input()
    formGroup: FormGroup;

    /* 分页广播事件  改变 页数大小 和 页索引 */
    @Output() changePage = new EventEmitter();
    @Output() changePageSize = new EventEmitter();

    /* 排序广播事件 */
    @Output() sortChange: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    clickCell = new EventEmitter<any>();

    @Output()
    closeCell = new EventEmitter<any>();

    /* 表头dom */
    @ViewChild('dtHeader', { read: ElementRef }) dtHeader: ElementRef;

    /* 表体 */
    @ViewChild('dtBody') dtBody: DataTableBodyComponent;

    /* 表格内有列模板 */
    @ContentChildren(FarrisTableColumnDirective) columnsRef: QueryList<FarrisTableColumnDirective>;

    /* 原始数据 */
    originData: any;

    // 表格可拖拽宽度系列
    // 拖拽线
    // 是否可拖拽  默认可以
    movable: boolean;
    // 用户获取表头+表格内容的高度  宽度  等
    datatableContainer: HTMLDivElement;

    // 拖拽线初始化位置
    startX: number;

    // 当前可调整列的索引
    resizeColIndex: number;

    /* 当前列宽度 */
    resizeThWidth: number;

    /* 表头宽度 */
    tableHeaderX: number;

    // 事件订阅存储  便于销毁
    subscription: Subscription[] = [];

    currentRowIndex: number;
    currentRow: any;

    /* 是否可编辑 */
    editable = {};

    get selections() {
        return this.dtBody.selections;
    }

    constructor(private dataService: DataTableService, private el: ElementRef, private idService: IdService) {

        /* 单选多选 */
        this.dataService.selectedRow.subscribe((e: any) => {
            if (this.singleSelect) {
                this.currentRowIndex = e.rowIndex;
                this.currentRow = e.rowData;
            } else {
                if (this.selections) {
                    this.dtBody.isCheckAll = Object.keys(this.selections).length === this.data.length;
                }
            }
        });

        this.dataService.unSelectedRow.subscribe((e: any) => {
            if (this.singleSelect) {
                this.currentRow = undefined;
                this.currentRowIndex = -1;
            } else {
                this.dtBody.isCheckAll = false;
            }
        });
    }

    ngOnInit() {
        // 初始化排序 深拷贝数据
        this.originData = JSON.parse(JSON.stringify(this.data));

    }

    private setSortDirection() {
        this.columns.forEach(ele => {
            ele['direction'] = undefined;
        });
    }

    // 排序事件 设置下一个排序状态 暴露出API 当前列标识以及下一个排序状态
    sortData(event: MouseEvent, column: any) {
        event.stopPropagation();
        if (!this.sortable || !column.sortable) {
            return;
        }
        const sortInfo = sortData(this.originData, this.data, column);
        this.data = sortInfo.data;
        this.setSortDirection();
        // 排序图标
        column.direction = sortInfo.dir;
        // 重置所有列的排序方向
        this.sortChange.emit([{
            field: column.field,
            dir: sortInfo.dir
        }]);

    }

    ngOnChanges(changes: SimpleChanges) {
    }

    ngAfterContentInit() {
        // 支持列组件写入
        if (!this.columns) {
            if (this.columnsRef && this.columnsRef.length) {
                this.columns = [];
                this.columnsRef.forEach((col: any) => {
                    this.columns.push(col);
                });
            }
        }
    }

    ngAfterViewInit() {
        // 初始化排序  初始化数据排序
        this.setSortDirection();
        // 获取表格容器  即表格
        // 获取整体table
        this.datatableContainer = this.el.nativeElement.querySelector('.farris-table');

    }
    ngOnDestroy() {
    }
    /* 伸缩列 或者调整列宽 */
    /* 鼠标按下伸缩列引擎元素 */
    beginDrag(e: any, ele: HTMLSpanElement) {
        e.preventDefault();
        e.stopPropagation();
        // 鼠标点击 初始化位置
        const tableHeader = this.dtHeader.nativeElement.querySelector('.table');
        const resizeHandlers = this.dtHeader.nativeElement.querySelectorAll('.column-resize-handler');
        const resizeHandlersParent = ele.parentElement;
        this.startX = e.pageX;
        this.tableHeaderX = tableHeader.clientWidth;
        this.resizeThWidth = resizeHandlersParent.offsetWidth;

        for (const i in resizeHandlers) {
            if (resizeHandlers[i] === ele) {
                this.resizeColIndex = Number(i);
            }
        }
        this.movable = true;
    }

    /* 鼠标移动伸缩列引擎元素 */
    moveDrag(e, el) {
        e.stopPropagation();
        if (this.movable) {
            const ths = this.dtHeader.nativeElement.querySelectorAll('th');
            const trs = this.dtBody.el.nativeElement.querySelectorAll('tr');
            const tableHeader = this.dtHeader.nativeElement.querySelector('.table');
            const tableBody = this.dtBody.el.nativeElement.querySelector('.table');
            ths[this.resizeColIndex].style.width = this.resizeThWidth + (e.pageX - this.startX) + 'px';
            for (const tr of trs) {
                const tds = tr.querySelectorAll('td');
                tds[this.resizeColIndex].style.width = this.resizeThWidth + (e.pageX - this.startX) + 'px';
            }
            this.columns[this.resizeColIndex].width = this.resizeThWidth + (e.pageX - this.startX);
            tableHeader.style.width = this.tableHeaderX + (e.pageX - this.startX) + 'px';
            tableBody.style.width = this.tableHeaderX + (e.pageX - this.startX) + 'px';
        }
    }

    /* 鼠标抬起伸缩列引擎元素 */
    stopDrag(e, column) {
        this.movable = false;
        const tableHeader = this.dtHeader.nativeElement.querySelector('.table');
        // const tableBody = this.dtBody.el.nativeElement.querySelector('.table');
        // tableHeader.style.width = this.tableHeaderX + (e.pageX - this.startX) + 'px';
        // tableBody.style.width = this.tableHeaderX + (e.pageX - this.startX) + 'px';
    }

    /* 分页 */
    changePageHandler(event: any) {
        // 广播
        this.changePage.emit(event);
    }

    /* 改变页面数量 */

    changePageSizeHandler(event: any) {
        this.changePageSize.emit(event);
    }

    onScrollX(e: any) {
        // 横向滚动 非固定表头滚动
        const x = e.srcElement.scrollLeft;
        // this.tableHeader.nativeElement.scrollTo(x, 0);
    }

    /**
     * 滚动条纵向滚动
     */
    onScrollY(e: any) {
        const y = e.srcElement.scrollTop;
        // this.dtLeftFixed.nativeElement.style.top = -y + 'px';
        // this.dtRightFixed.nativeElement.style.top = -y + 'px';

    }

    onCheckAll(state: boolean) {
        this.dataService.selectedAll.next(state);
    }

    /* 进入单元格编辑 formGroup赋值*/
    editCell(rowIndex: number, column: any, formGroup?: FormGroup) {
        let col = column;
        if (typeof column === 'number') {
            col = this.columns[column];
        }
        this.formGroup = formGroup;
        this.editable[rowIndex + col.field] = true;
    }
}

