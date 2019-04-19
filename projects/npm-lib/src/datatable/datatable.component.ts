import { RowDirective } from './datatable-row.component';
import {
    Component, OnInit, ViewChild, ElementRef, OnChanges, Input, SimpleChanges, ContentChild, TemplateRef,
    QueryList, AfterContentInit, AfterViewInit, ContentChildren, Output, EventEmitter, ViewEncapsulation, OnDestroy
} from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { DataTableColumn, deepCopy } from './datatable-column';
import { FarrisTableColumnDirective } from './datatable-column.component';
import { DataTableService } from './datatable.service';
import { PaginationInstance, PerfectScrollbarComponent } from '@farris/ui';
import { DataTableHeaderComponent } from './table/datatable-header.component';
import { DataTableBodyComponent } from './table/datatable-body.component';
import { Subscription } from 'rxjs';
import { IdService } from './utils/id.service';
import { sortBy, nextSort, sortData } from './utils/sort';
@Component({
    selector: 'farris-table',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit, AfterViewInit {
    searchButtonText = '<i class="f-icon datatable-icon-search"></i>';
    // 排序
    @Input() sortType: 'single' | 'multiple';
    @Input() sortable: boolean;
    @Input() sortSetting: any[];
    // 行号
    @Input() showLineNumber: boolean;
    // 空数据提示
    @Input()
    @ContentChild('noDataText') noDataText: TemplateRef<any>;
    // tslint:disable-next-line:no-input-rename
    @Input() id: string;
    @Input() size: string;
    @Input() allColumnsTitle = '所有列';
    // table 尺寸
    @Input() width: number;
    // 组件级高度包括过滤条高度
    @Input() height: number;

    tableHeight: number; // 数据表高度
    // 是否填充
    @Input() fill = false;
    // 默认分页
    @Input() pagination = true;
    @Input() pageSize = 10;
    @Input() pageIndex = 1;
    @Input() pageList = [10, 20, 30, 50, 100];
    @Input() total = 0;
    // 列 数据
    @Input() columns: DataTableColumn[];
    @Input() searchFields: { label: string, value: string }[];
    // 可筛选
    // table  数据
    _data = [];
    @Input()
    get data() {
        return this._data;
    }
    set data(data: Array<any>) {
        this._data = data;
    }
    originData: any;
    // 深拷贝data 数据
    copyData: any;
    //
    @Input() remote = 'client';
    // 多选  单选
    @Input() singleSelect = true;
    @Input() idField = 'id';
    // 显示鼠标悬停高亮
    @Input() hover: boolean;
    // 斑马线
    @Input() striped: boolean;
    // 边框
    @Input() bordered: boolean;
    // 支持添加行 单元格 类样式
    @Input() rowClassName: (row: any, index: number) => string;
    @Input() cellClassName: (value: any, col: any) => string;

    @Output() sortChange: EventEmitter<any> = new EventEmitter<any>();
    // 滚动条引用
    // @ViewChild('dtLeftBody') dtLeftBody: DataTableBodyComponent;
    // @ViewChild('dtRightBody') dtRightBody: DataTableBodyComponent;
    // @ViewChild('dtLeftFixed') dtLeftFixed: ElementRef;
    // @ViewChild('dtRightFixed') dtRightFixed: ElementRef;
    @ViewChild('dtBody') dtBody: DataTableBodyComponent;
    // 分页事件
    @Output() pageChanged = new EventEmitter();
    @Output() pageSizeChanged = new EventEmitter();
    @Output() search = new EventEmitter<{ field: string, value: string }>();
    @Output('on-select-row') selectRows = new EventEmitter<any>();
    @ContentChildren(FarrisTableColumnDirective) columnsRef: QueryList<FarrisTableColumnDirective>;
    // 表尾
    @ContentChild('footer') footer: TemplateRef<any>;
    // 表格可拖拽宽度系列
    // 拖拽线
    @ViewChild('dragLine') dragLine: ElementRef;
    // 是否可拖拽  默认可以
    @Input() draggable = false;
    // 是否有行模板dragable
    hasRowTepml = false;
    // 用户获取表头+表格内容的高度  宽度  等
    datatableContainer: HTMLDivElement;
    // 拖拽线初始化位置
    dragLineX: number;
    // 设置拖拽停止器
    moveable = false;
    //
    currentColumn: any;
    // 设置左固定列
    // 设置右固定列
    // 事件订阅存储  便于销毁
    subscription: Subscription[] = [];
    // 固定列时  同一行的tr hover事件
    // 原数据
    public maxSize = 7;
    public directionLinks = true;
    public autoHide = false;
    public responsive = true;
    public paginationOptions: PaginationInstance = {
        id: 'Farris-DataTable-Pagination',
        itemsPerPage: this.pageSize,
        currentPage: this.pageIndex,
        pageList: this.pageList,
        totalItems: this.total
    };
    public labels: any = {
        previousLabel: ' ',
        nextLabel: ' ',
        screenReaderPaginationLabel: 'Pagination',
        screenReaderPageLabel: 'page',
        screenReaderCurrentLabel: `You're on page`
    };

    private _currentRowIndex = -1;
    get currentRowIndex(): number {
        return this._currentRowIndex;
    }

    private _currentRow = undefined;
    get currentRow() {
        return this._currentRow;
    }

    get selections() {
        return this.dtBody.selections;
    }

    @ViewChild('perfectScrollbar') perfectScrollbar: PerfectScrollbarComponent;

    scorllableBodyHeight: number;
    constructor(private dataService: DataTableService, private el: ElementRef, private idService: IdService) {

        this.dataService.selectedRow.subscribe((e: any) => {
            if (this.singleSelect) {
                this._currentRowIndex = e.rowIndex;
                this._currentRow = e.rowData;
            } else {
                if (this.selections) {
                    this.dtBody.isCheckAll = Object.keys(this.selections).length === this.data.length;
                }
            }
        });

        this.dataService.unSelectedRow.subscribe((e: any) => {
            if (this.singleSelect) {
                this._currentRow = undefined;
                this._currentRowIndex = -1;
            } else {
                this.dtBody.isCheckAll = false;
            }
        });
    }

    private ps: PerfectScrollbar;

    ngOnInit() {
        setTimeout(() => {
            this.setBodyHeight();
        });

        if (!this.id) {
            this.id = this.idService.uuid(8, 16);
        }

        this.paginationOptions.id = this.paginationOptions.id + this.id;

        if (this.remote === 'server') {
            this.paginationOptions['totalItems'] = 1;
        }
        // 初始化排序 备份数据
        this.originData = JSON.parse(JSON.stringify(this.data));
    }

    private setSortDirection() {
        this.columns.forEach(ele => {
            ele['direction'] = undefined;
        });
    }
    // 排序事件 设置下一个排序状态 暴露出API 当前列标识以及下一个排序状态
    sortData(event: MouseEvent, column: any) {
        event.preventDefault();
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
    private setBodyHeight() {
        /*  */
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.height && !changes.height.isFirstChange()) {
            this.setBodyHeight();
        }

        if (changes.total && !changes.total.isFirstChange()) {
            this.paginationOptions.totalItems = changes.total.currentValue;
        }

        if (changes.pageSize) {
            this.paginationOptions.itemsPerPage = changes.pageSize.currentValue;
        }

        // if (changes.data && !changes.data.isFirstChange()) {
        //     const rows = changes.data.currentValue;
        //     if (rows) {
        //         if (this.selections) {
        //             const keys = Object.keys(this.selections);
        //             if (keys.length) {
        //                 let count = 0;
        //                 const ids = rows.map((row: any) => {
        //                     return row[this.idField].toString();
        //                 });
        //                 keys.forEach(id => {
        //                     if (ids.indexOf(id) > -1) {
        //                         count++;
        //                     }
        //                 });
        //                 this.dtHeader.isCheckAll = ids.length === count;
        //             } else {
        //                 this.dtHeader.isCheckAll = false;
        //             }
        //         } else {
        //             this.dtHeader.isCheckAll = false;
        //         }
        //     }
        //     this.dataService.loadSuccess.next(changes.data.currentValue);
        // }
    }

    ngAfterContentInit() {
        // 支持列组件写入
        if (!this.columns) {
            if (this.columnsRef && this.columnsRef.length) {
                this.columns = this.columnsRef.map(col => {
                    return {
                        width: col.width,
                        title: col.title,
                        field: col.field,
                        align: col.align,
                        fixed: col.fixed,
                        className: col.className,
                        multipleFilter: col.multipleFilter,
                        filter: col.filter,
                        media: col.media,
                        sortable: col.sortable,
                        edit: col.edit,
                        formatter: col.formatter,
                        hidden: col.hidden,
                        // 单元格模板
                        cellTempl: col.cellTempl
                    };
                });
            }
        }
    }
    ngOnDestroy() {
        this.subscription.forEach(sub => {
            sub.unsubscribe();
        });
        this.subscription = [];
    }
    ngAfterViewInit() {

        // 初始化排序  初始化数据排序
        this.setSortDirection();
        // 获取表格容器  即表格
        this.datatableContainer = this.el.nativeElement.querySelector('.farris-datatable');
        // this.headerTr = this.tableHeader.nativeElement.querySelectorAll('tr');
        setTimeout(() => {
            // this.setFixed(window.innerWidth);
        }, 0);
    }
    resetData() {
        this.data = deepCopy(this.copyData);
    }
    changeFilterData(filteredData) {
        this.data = this.data.concat(filteredData);
        this.data.splice(0, this.copyData.length);
    }
    /**
     * 获取表格容器的位置  距离左边视口和上边视口的距离  如果页面有滚动条  需要加上滚动条滚动的数值
     */
    getContainerOffset() {
        const rect = this.datatableContainer.getBoundingClientRect();
        return {
            left: rect.left + document.body.scrollLeft,
            top: rect.top + document.body.scrollTop,
            right: rect.right,
            bottom: rect.bottom,
        };
    }
    beginDrag(e) {
        this.dragLineX = e.pageX;
        event.preventDefault();
    }
    moveDrag(e) {
        // 获取表格的左边距离
        const containerLeft = this.getContainerOffset().left;
        // 设置拖拽线的高度  即获取表头+表内容+表尾的高度  此表格结构包含了分页  因此要去掉分页的高度
        if (this.tablePager) {
            this.dragLine.nativeElement.style.height = this.datatableContainer.offsetHeight -
                this.tablePager.nativeElement.offsetHeight + 'px';
        } else {
            const headerHeight = this.el.nativeElement.querySelector('.farris-table-header');
            const bodyHeight = this.el.nativeElement.querySelector('.ps-content');
            this.dragLine.nativeElement.style.height = headerHeight.offsetHeight +
                bodyHeight.offsetHeight + 'px';
        }
        // 设置拖拽线的高度 拖拽线相对于表格relative定位是absolute，因此是0
        this.dragLine.nativeElement.style.top = 0 + 'px';
        // 鼠标移动时，拖拽线相对于表格的位置
        this.dragLine.nativeElement.style.left = (e.pageX - containerLeft) + 'px';
        // 鼠标移动  设置拖拽线总是可见
        this.dragLine.nativeElement.style.display = 'block';
    }
    stopDrag(e, column) {
        this.resizeColumn(e, column);
    }
    resizeColumn(e, column) {
        // 偏移量
        const delta = e.pageX - this.dragLineX;
        // 拖拽前列宽
        const columnWidth = column.offsetWidth;
        // 拖拽后列宽
        const newColumnWidth = columnWidth + delta;
        // 最小宽度
        const minWidth = column.style.minWidth || 15;
        // 新宽度大于最小宽度时  重新设置宽度
        if (newColumnWidth > parseInt(minWidth, 10)) {
            let colIndex = -1;
            const cols = this.tableHeader.nativeElement.querySelectorAll('th');
            for (let i = 0; i < cols.length; i++) {
                if (cols[i] === column) {
                    colIndex = i;
                }
            }
            // 设置后一个单元格宽度
            const nextColumn = column.nextElementSibling;
            if (nextColumn) {
                // 下一个单元格的最新宽度
                const nextColumnWidth = nextColumn.offsetWidth - delta;
                const nextColumnMinWidth = nextColumn.style.minWidth || 15;
                if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth, 10)) {
                    this.resizeColGroup(this.dtHeader.el.nativeElement, colIndex, newColumnWidth, nextColumnWidth);
                    this.resizeColGroup(this.dtBody.el.nativeElement, colIndex, newColumnWidth, nextColumnWidth);
                }
            }
        }
        // 计算宽度完毕  设置拖拽线隐藏
        this.dragLine.nativeElement.style.display = 'none';
    }
    resizeColGroup(table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
        if (table) {
            // 此处要视不同的表格结构来确定 本组件中  header和body结构相同
            const colGroup = table.childNodes[1].children[0].nodeName === 'COLGROUP' ?
                table.childNodes[1].children[0] : null;
            if (colGroup) {
                const col = colGroup.children[resizeColumnIndex];
                const nextCol = col.nextElementSibling;
                col.style.width = newColumnWidth + 'px';

                if (nextCol && nextColumnWidth) {
                    nextCol.style.width = nextColumnWidth + 'px';
                }
            } else {
                throw new Error('Scrollable tables require a colgroup to support resizable columns');
            }
        }
    }
    onScrollX(e: any) {
        // 横向滚动 非固定表头滚动
        const x = e.srcElement.scrollLeft;
        this.tableHeader.nativeElement.scrollTo(x, 0);
    }
    /**
     * 滚动条纵向滚动
     */
    onScrollY(e: any) {
        if (!this.hasFixed) {
            return;
        }
        const y = e.srcElement.scrollTop;
        // this.dtLeftFixed.nativeElement.style.top = -y + 'px';
        // this.dtRightFixed.nativeElement.style.top = -y + 'px';

    }

    onPageChange(page: { pageIndex: number, pageSize: number }) {
        this.paginationOptions.currentPage = page.pageIndex;
        if (this.pageIndex !== page.pageIndex) {
            this.pageIndex = page.pageIndex;
            this.pageChanged.emit({ pageInfo: page, search: this.searchData });
        }
    }

    onPageSizeChange(pageSize: number) {
        this.paginationOptions.itemsPerPage = pageSize;
        if (this.pageSize !== pageSize) {
            this.pageSize = pageSize;
            this.pageSizeChanged.emit({ pageInfo: { pageIndex: this.pageIndex, [pageSize]: pageSize }, search: this.searchData });
        }
    }

    onSearch() {
        this.search.emit(this.searchData);
    }

    onCheckAll(state: boolean) {
        this.dataService.selectedAll.next(state);
    }

    selectRow(row: any) { }

    loadData(data: { pageSize: number, total: number, data: any, pageIndex: number }) {
        this.data = data.data;
        if (this.pagination) {
            this.paginationOptions.totalItems = data.total;
            this.paginationOptions.itemsPerPage = data.pageSize;
            this.total = data.total;
            this.pageSize = data.pageSize;
            this.pageIndex = data.pageIndex;
        }
    }
    onSelectRow(e) {
        this.selectRows.emit(e);
    }
}

